import {RelationshipInterface} from "../../relationshipsService/interfaces/RelationshipInterface";
import {ImageInterface} from "../../galleryService/interfaces/ImageInterface";
import {TFile} from "obsidian";
import {CodeblockDomainInterface} from "./CodeblockDomainInterface";

export interface CodeblockServiceInterface {
	addOrUpdate(
		key: string,
		value?: string|boolean|number,
		file?: TFile,
	): Promise<void>;

	addOrUpdateFrontmatter(
		key: string,
		value?: string|boolean|number,
		file?: TFile,
	): Promise<void>;

	addOrUpdateImage(
		path: string,
		caption: string,
		file?: TFile,
	): Promise<ImageInterface|undefined>;

	addOrUpdateRelationship(
		relationship: RelationshipInterface,
		file?: TFile,
	): Promise<void>;

	addOrUpdateRelationshipInCodeblock(
		relationship: RelationshipInterface,
		domain: CodeblockDomainInterface,
	): Promise<void>;

	read(
		file?: TFile,
		codeblockName?: string,
	): Promise<CodeblockDomainInterface|undefined>;

	replaceID(
		file: TFile,
		id: string,
	): Promise<void>;

	remove(
		key: string,
		file?: TFile,
	): Promise<void>;

	removeFrontmatter(
		key: string,
		file?: TFile,
	): Promise<void>;

	removeImage(
		path: string,
		file?: TFile,
	): Promise<void>;

	removeRelationship(
		path: string,
		file?: TFile,
	): Promise<void>;

	selectRpgManagerData(
	): Promise<void>;

	startRunningTime(
	): Promise<void>;

	stopRunningTime(
		file?: TFile,
	): Promise<void>;

	updateDomain(
		domain: CodeblockDomainInterface,
	): Promise<void>;
}
