import { Question } from './questions/Question';

export class SurveyDataModel {
    _id: any;
    id: number;
   
    questions: Question[];
    constructor(public  name:String,public client:String,public title:String ,public  description:String) {
          
        this.questions = [];
    }

}
