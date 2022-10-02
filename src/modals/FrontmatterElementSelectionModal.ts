import {AbstractRpgManagerModal} from "../abstracts/AbstractRpgManagerModal";
import {App, Component, MarkdownRenderer} from "obsidian";
import {ComponentType} from "../enums/ComponentType";
import {SorterComparisonElement} from "../database/SorterComparisonElement";
import {SorterType} from "../enums/SorterType";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";
import {RelationshipV2Interface} from "../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class FrontmatterElementSelectionModal extends AbstractRpgManagerModal {
	private relationshipsEl: HTMLDivElement;

	private availableRelationships: Array<ComponentType> = [
		ComponentType.Subplot,
		ComponentType.Event,
		ComponentType.NonPlayerCharacter,
		ComponentType.Character,
		ComponentType.Faction,
		ComponentType.Music,
		ComponentType.Location,
		ComponentType.Clue,
	];

	constructor(
		app: App,
		private currentElement: ComponentV2Interface,
	) {
		super(app);
	}

	onOpen() {
		super.onOpen();

		const {contentEl} = this;
		contentEl.empty();

		const relationshipsModalEl = contentEl.createDiv({cls: 'rpgm-modal-relationships'})

		relationshipsModalEl.createEl('h2', {text: 'Relationship Selector'});
		relationshipsModalEl.createDiv({text: 'Select the type of component'});

		this.addRelationshipV2TypeSelector(relationshipsModalEl);
		this.relationshipsEl = relationshipsModalEl.createDiv({cls:'relationships', text: ''});
	}

	private addRelationshipV2TypeSelector(
		contentEl: HTMLElement,
	): void {
		const RelationshipV2TypeSelectorEl: HTMLSelectElement = contentEl.createEl('select');
		RelationshipV2TypeSelectorEl.createEl("option", {
			text: '',
			value: '',
		});
		this.availableRelationships.forEach((type: ComponentType) => {
			RelationshipV2TypeSelectorEl.createEl("option", {
				text: ComponentType[type] + 's',
				value: type.toString(),
			});
		});
		RelationshipV2TypeSelectorEl.addEventListener('change', () => {
			this.relationshipsEl.empty();
			if (RelationshipV2TypeSelectorEl.value !== ''){
				this.addElementsToList(+RelationshipV2TypeSelectorEl.value);
			}

		});
	}

	private addElementsToList(
		type: ComponentType,
	): void {
		const relationshipsTableEl: HTMLTableSectionElement = this.relationshipsEl.createEl('table').createTBody();

		const components: Array<ComponentV2Interface> = this.database.readList<ComponentV2Interface>(type, this.currentElement.id)
			.sort(
				this.factories.sorter.create<ComponentV2Interface>([
					new SorterComparisonElement((component: ComponentV2Interface) => component.existsInRelationships(this.currentElement.getRelationships()), SorterType.Descending),
					new SorterComparisonElement((component: ComponentV2Interface) => component.file.stat.mtime, SorterType.Descending),
				])
			);

		components.forEach((component: ComponentV2Interface) => {
			if (component.id !== this.currentElement.id) {
				const rowEl: HTMLTableRowElement = relationshipsTableEl.insertRow();

				const checkbox = rowEl.insertCell().createEl('input');
				checkbox.type = 'checkbox';
				checkbox.value = component.file.path;
				checkbox.id = component.file.basename;

				checkbox.addEventListener('change', () => {
					this.addOrRemoveElementRelationship(checkbox, component);
				});

				let description: string = component.file.basename;
				if (component.existsInRelationships(this.currentElement.getRelationships())) {
					checkbox.checked = true;

					const relationships: Array<RelationshipV2Interface> = this.currentElement.getRelationships()
						.filter((relationship: RelationshipV2Interface) =>
							relationship.component?.file.basename === component.file.basename
						);

					if (relationships.length === 1) {
						if (relationships[0].description !== '') {
							description += ' (WARNING: removing this relationship will delete its description)';
						}
					}
				}

				/** IMAGE */
				if (component.image != null){
					const img = new Image(40, 40);
					img.src = component.image;
					img.style.objectFit = 'cover';
					rowEl.insertCell().append(img as Node);
				} else {
					rowEl.insertCell();
				}

				/** TITLE */
				const titleCell = rowEl.insertCell();
				titleCell.addClass('label');
				const checkboxLabel = titleCell.createEl('label', {text: description});
				checkboxLabel.htmlFor = component.file.basename;

				/** DESCRIPTION */
				const synopsisEl = rowEl.insertCell();
				synopsisEl.addClass('description')
					MarkdownRenderer.renderMarkdown(
						component.synopsis ?? '',
						synopsisEl,
						'',
						null as unknown as Component,
					)
			}
		});
	}

	private addOrRemoveElementRelationship(
		checkboxEl: HTMLInputElement,
		data: ComponentV2Interface,
	): void {
		const map: Map<string, string> = new Map<string, string>();
		map.set('[[' + data.file.basename + ']]', '""');

		if (checkboxEl.checked) {
			this.factories.frontmatter.update(this.currentElement.file, map);
		} else {
			this.factories.frontmatter.remove(this.currentElement.file, map);
		}
	}

	onClose() {
		super.onClose();
	}
}
