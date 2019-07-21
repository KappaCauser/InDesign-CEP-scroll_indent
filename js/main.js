var CSLibrary = new CSInterface();

//ウィンドウ
CSLibrary.resizeContent( parseInt(132) , parseInt(185) );

//ウィンドウサイズ初期表示
////////////////////////////////////////////////
// 選択した文字オブジェクトのインデントを取得してウィンドウに表示
//【内容】
//「01．読み込み時」
//「02．イベントリスナー」
//「03．radioボタンオンクリック」

//「01．読み込み時」
getSelPointSizeDate();

//「02．イベントリスナー」
new CSInterface().addEventListener(
    "afterSelectionChanged", 
    function(event) {
      getSelPointSizeDate()
    }
)

//「03．radioボタンオンクリック」
function radioOnClickFnc(){
  getSelPointSizeDate();
}

function getSelPointSizeDate(){
  //表示するオブジェクト
  //「設定：字上げ」
  var view_jiage = $("#EvlSc_jiage");
  //「設定：字下げ」 
  var view_jisage = $("#EvlSc_jisage");
  //「設定：問答」 
  var view_mondou = $("#EvlSc_mondou");
  //「ステップ：文字」
  var view_step_moji = $("#step_moji");
  //「ステップ：mm」 
  var view_step_mm = $("#step_mm");
  //「ステップ：pt」
  var view_step_pt = $("#step_pt");
  //「ステップ：Q」
  var view_step_Q = $("#step_Q");
  
  //「ラジオ選択した単位を取得」
  var getRadio = getRadioVal();
  
  //evalScript
  var evalNewLocPath = 'getSelIndent("' + getRadio +'");';

  //evalScript実行
  CSLibrary.evalScript(
    evalNewLocPath,
    function( result ) {
      var resultSp = result.split(",");
      var l_Indent = eval( resultSp[0] );
      var R_Indent = eval( resultSp[1] );
      var F_Indent = eval( resultSp[2] );
      //字上げの数値
      var setJiage = l_Indent + F_Indent;
      //字上げの最大と最小
      var l_IndentMin = eval( resultSp[3] );
      var l_IndentMax = eval( resultSp[4] );
      //字下げの最大と最小
      var R_IndentMin = eval( resultSp[5] );
      var R_IndentMax = eval( resultSp[6] );
      //問答の最大と最小
      var F_IndentMin = eval( resultSp[7] );
      var F_IndentMax = eval( resultSp[8] );
      //「字上げ」
      view_jiage.val( l_Indent );
      view_jiage.attr( 'min' , l_IndentMin );
      view_jiage.attr( 'max' , l_IndentMax );
      //「字下げ」 
      view_jisage.val( R_Indent );
      view_jisage.attr( 'min' , R_IndentMin );
      view_jisage.attr( 'max' , R_IndentMax );
      //「問答」 
      view_mondou.val( F_Indent );
      view_mondou.attr( 'min' , F_IndentMin );
      view_mondou.attr( 'max' , F_IndentMax );
      
      //ステップ設定
      var viewObjArr = [ view_jiage , view_jisage , view_mondou ];

      function viewObjArrFnc( setArr , readObj ){
        for ( var i in setArr ){
          setArr[i].attr( 'step' , readObj.val() );
        }
      }
      switch ( getRadio ){
        case "chara" :
          viewObjArrFnc( viewObjArr , view_step_moji );
        break;
        case "MILLIMETERS" :
          viewObjArrFnc( viewObjArr , view_step_mm );
        break;
        case "POINTS" :
          viewObjArrFnc( viewObjArr , view_step_pt );
        break;
        case "Q" :
         viewObjArrFnc( viewObjArr , view_step_Q );
        break;
      }
    }
  );
}

////////////////////////////////////////////////
// マウスイベント

//「字上げ」
var view_jiage = $("#EvlSc_jiage");
view_jiage.on('input wheel', function(event) {
    //入力された内容を読んでインデント実行
    mouseEvResultFnc();
});
//「字下げ」
var view_jisage = $("#EvlSc_jisage");
view_jisage.on('input wheel', function(event) {
    //入力された内容を読んでインデント実行
    mouseEvResultFnc();
});
//「問答」 
var view_mondou = $("#EvlSc_mondou");
view_mondou.on('input wheel', function(event) {
    //入力された内容を読んでインデント実行
    mouseEvResultFnc();
});

//入力された内容を読んでインデント実行
function mouseEvResultFnc(){
    //「字上げ」
    var value_1 = $("#EvlSc_jiage").val();
    //「字下げ」 
    var value_2 = $("#EvlSc_jisage").val();
    //「問答」 
    var value_3 = $("#EvlSc_mondou").val();
    var valuesArr = new Array( value_1 , value_2 , value_3 );
    //「ラジオ選択した単位を取得」
    var getRadio = getRadioVal();
    //evalScript実行
    CSLibrary.evalScript( 'setIndent("' + getRadio + '","' + valuesArr.toString() +'");' );
    //字上げ字下げ問答読み込み
    getSelPointSizeDate();
}

//「ラジオ選択した単位を取得」
function getRadioVal(){
  //「単位」
  var radios = $('input[name="EvlSc_tani"]');
  //環境設定radioボタンで何を選択しているか取得
  if ( radios.length >= 0 ){
    for ( var i = 0 ; i < radios.length ; i ++ ){
      if ( radios[i].checked == true ){
        var getRadio = radios[i].value;
        break;
      }
    }
    return getRadio;
  }
}

////////////////////////////////////////////////
// コンテキストメニュー　フライアウトメニュー
//https://github.com/undavide/PS-Panels-Boilerplate/blob/master/src/com.undavide.flyout/js/main.js
var setbool = true;
// XMLテキスト
var setXmlLabel_1 = "オプションを表示";
var setXmlLabel_2 = "オプションを隠す";
var reg = new RegExp( "setLavel" , "g" );
var flyoutXML = '<Menu><MenuItem Id="enabledMenuItem" Label="setLavel" Enabled="true" Checked="false"/></Menu>';
//「Flyout menu」読み込み
var setRepXml = flyoutXML.replace( reg , setXmlLabel_1 );

CSLibrary.setPanelFlyoutMenu( setRepXml );

//「Flyout menu」切り替え
CSLibrary.addEventListener( "com.adobe.csxs.events.flyoutMenuClicked" , flyoutMenuClickedHandler );

//「Flyout menu」切り替え
function flyoutMenuClickedHandler (event) {
  if ( event.data.menuId == "enabledMenuItem" ){
    if ( setbool == true ){
      var setRepXml = flyoutXML.replace( reg , setXmlLabel_2 );
      //メニュー作成
      CSLibrary.setPanelFlyoutMenu(setRepXml);
      //リサイズ
      CSLibrary.resizeContent( parseInt(140) , parseInt(350) );
      setbool = false;
    }
    else if ( setbool == false ){
      var setRepXml = flyoutXML.replace( reg , setXmlLabel_1 );
      //メニュー作成
      CSLibrary.setPanelFlyoutMenu( setRepXml );
      //リサイズ
      CSLibrary.resizeContent( parseInt(140) , parseInt(185) );
      setbool = true;
    }
  }
}