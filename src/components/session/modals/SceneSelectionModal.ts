import {TFile} from "obsidian";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {SceneInterface} from "../../scene/interfaces/SceneInterface";
import {SessionInterface} from "../interfaces/SessionInterface";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SorterType} from "../../../services/searchService/enums/SorterType";
import {AbstractModal} from "../../../managers/modalsManager/abstracts/AbstractModal";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {SorterService} from "../../../services/sorterService/SorterService";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";

export class SceneSelectionModal extends AbstractModal {
	private _availableScenes:SceneInterface[];
	private _scenesEls: Map<TFile, HTMLInputElement>;
	private _initialScenesEls: Map<string, boolean>;
	private _actSelectorEl: HTMLSelectElement;
	private _sessionContainerEl: HTMLDivElement;
	private _selectedAct: ActInterface|undefined;

	constructor(
		api: RpgManagerApiInterface,
		private _session: SessionInterface,
	) {
		super(api);
		this._scenesEls = new Map<TFile, HTMLInputElement>();
		this._loadAvailableScenes();
	}

	onOpen() {
		super.onOpen();
		const {contentEl} = this;
		contentEl.empty();
		contentEl.addClass('rpg-manager-modal');
		contentEl.createEl('h2', {text: 'SceneModel Selector'});
		contentEl.createEl('p', {text: 'Select the scenes to add to the session "' + this._session.file.basename + '"'});
		const actSelectorContainerEl = contentEl.createDiv();
		actSelectorContainerEl.createDiv({text: 'Limit scenes to a specific act'});
		this._actSelectorEl = actSelectorContainerEl.createEl('select');
		this._actSelectorEl.createEl('option', {
			text: '',
			value: '',
		});

		const acts = this.api.database.read<ActInterface>((act: ActInterface) =>
			act.id.type === ComponentType.Act &&
			act.id.campaignId === this._session.id.campaignId
		).sort(this.api.service(SorterService).create<ActInterface>([
			new SorterComparisonElement((act: ActInterface) => act.file.stat.mtime, SorterType.Descending)
		]));

		acts.forEach((act: ActInterface) => {
			this._actSelectorEl.createEl('option', {text: act.file.basename, value: act.file.path});
		});

		this._actSelectorEl.addEventListener('change', () => {
			if (this._actSelectorEl.value !== '') {
				this._selectedAct = this.api.database.readByPath<ActInterface>(this._actSelectorEl.value);
			} else {
				this._selectedAct = undefined;
			}
			this._loadAvailableScenes();

			this._populateAvailableScenes();
		});

		this._sessionContainerEl = contentEl.createDiv({cls: 'rpg-manager-modal-scene-container'});
		this._populateAvailableScenes();

		const scenesSelectionButtonEl = contentEl.createEl('button', {text: 'Add selected scenes to session "' + this._session.file.basename + '"'});

		scenesSelectionButtonEl.addEventListener("click", () => {
			this._addScenes()
				.then(() => {
					this._session.touch(true);
					this.app.workspace.trigger("rpgmanager:force-refresh-views");
					this.close();
				});
		});
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
		super.onClose();
	}

	private _loadAvailableScenes(
	): void {
		this._availableScenes = this.api.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === this._session.id.campaignId &&
				(this._selectedAct !== undefined ? scene.id.actId === this._selectedAct.id.actId : true) &&
				(scene.session === undefined || scene.session?.id.sessionId === this._session.id.sessionId),
		).sort(this.api.service(SorterService).create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
			new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
		]));
	}

	private _populateAvailableScenes(
	): void {
		let populateInitialScenes = false;

		if (this._initialScenesEls === undefined) {
			this._initialScenesEls = new Map<string, boolean>();
			populateInitialScenes = true;
		}

		if(this._sessionContainerEl.childNodes.length > 0){
			const keysToRemove: number[] = [];

			this._sessionContainerEl.childNodes.forEach((value: ChildNode, key: number, parent: NodeListOf<ChildNode>) => {
				const option = value.childNodes[0];

				if (!(<HTMLInputElement>option).checked)
					keysToRemove.push(key);

			});

			keysToRemove.sort((n1,n2) => n2 - n1).forEach((key: number) => {
				this._sessionContainerEl.childNodes[key].remove();
			});
		}

		this._availableScenes.forEach((scene: SceneInterface) => {
			if (!this._scenesEls.has(scene.file)) {
				const checkboxDiv = this._sessionContainerEl.createDiv();
				const checkbox = checkboxDiv.createEl('input');
				checkbox.type = 'checkbox';
				checkbox.value = scene.file.path;
				checkbox.id = scene.file.basename;

				if (scene.session?.id.sessionId === this._session.id.sessionId) {
					checkbox.checked = true;
					this._scenesEls.set(scene.file, checkbox);
					if (populateInitialScenes)
						this._initialScenesEls.set(scene.file.path, checkbox.checked);

				}

				checkbox.addEventListener('change', () => {
					if (checkbox.checked){
						this._scenesEls.set(scene.file, checkbox);
					}
				});

				const checkboxLabel = checkboxDiv.createEl('label', {text: scene.file.basename});
				checkboxLabel.htmlFor = scene.file.basename;
			}
		});
	}

	private async _addScenes(
	): Promise<void> {
		for (const [file, sceneEl] of this._scenesEls){
			const initialSceneCheked = await this._initialScenesEls.get(file.path);

			if (initialSceneCheked === undefined || sceneEl.checked !== initialSceneCheked) {
				await this.api.service(CodeblockService).addOrUpdate(
					'data.sessionId',
					(sceneEl.checked === true ? this._session.id.stringID : ''),
					file,
				);
			}
		}
	}
}
