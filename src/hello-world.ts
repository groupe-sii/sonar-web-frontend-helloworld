export enum stateType {
    COMPLETED,
    OPENED,
};

interface ITask {
    name: string;
    state: stateType;
};

export default class Task implements ITask {

    constructor( public name: string, public state: stateType) {
        this.state = stateType.OPENED;
    }

    public render():HTMLElement{
        let liElement = document.createElement('li');
        liElement.textContent = this.name;
        return liElement;
    }
}
