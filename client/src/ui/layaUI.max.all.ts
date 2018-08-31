
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class indexFrameUI extends View {
		public startBtn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Button","props":{"var":"startBtn","stateNum":2,"skin":"indexFrame/res_01.png","centerX":0,"bottom":200}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.indexFrameUI.uiView);

        }

    }
}
