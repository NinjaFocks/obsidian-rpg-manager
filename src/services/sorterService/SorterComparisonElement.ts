import {SorterComparisonElementInterface} from "./interfaces/SorterComparisonElementInterface";
import {SorterType} from "../searchService/enums/SorterType";

export class SorterComparisonElement implements SorterComparisonElementInterface {
	constructor(
		public comparisonElement: any,
		public sortType: SorterType=SorterType.Ascending,
	) {
	}
}
