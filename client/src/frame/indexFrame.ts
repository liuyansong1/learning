/*
* name;
*/
class indexFrame extends ui.indexFrameUI{
    constructor(){
        super();
        this.startBtn.on(Laya.Event.CLICK, this, function(){
            this.removeSelf();
            GameManager.Instance.gameStart();
            
        });
    }
}