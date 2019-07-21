//字上げ、字下げ、問答を表示
function getSelIndent( type ){
    app.doScript("var getReturn = func(type)", ScriptLanguage.JAVASCRIPT , null , UndoModes.ENTIRE_SCRIPT , "my script");
    return getReturn;
    function func( type ){
        /*
        説明
        「type」はラジオボタンで取得した文字の単位
        */
        //スクリプトで取得する単位を設定（measurementUnit）
        switch( type ){
            case "MILLIMETERS": app.scriptPreferences.measurementUnit = MeasurementUnits.MILLIMETERS; break;
            case "POINTS": app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS; break;
            case "Q": app.scriptPreferences.measurementUnit = MeasurementUnits.Q; break;
            case "chara": app.scriptPreferences.measurementUnit = MeasurementUnits.MILLIMETERS; break;
        }

        var sel = app.activeDocument.selection[0];
        var checkTxBool = false;
        switch ( sel.constructor.name ){
            case "InsertionPoint": checkTxBool = true; break;
            case "Character": checkTxBool = true; break;
            case "Word": checkTxBool = true; break;
            case "TextStyleRange": checkTxBool = true; break;
            case "Line": checkTxBool = true; break;
            case "Paragraph": checkTxBool = true; break;
            case "TextColumn": checkTxBool = true; break;
            case "Text": checkTxBool = true; break;
            case "Story": checkTxBool = true; break;
        }
        if ( checkTxBool == true ){
            var selPntSze = sel.pointSize;
            var l_Indent = eval(sel.leftIndent) + eval(sel.firstLineIndent);
            var R_Indent = sel.rightIndent;
            var F_Indent = - sel.firstLineIndent;

            //MaxとMinを取得
            //親ボックスの幅を取得
            var selVb = sel.parentTextFrames[0].visibleBounds;
            var selVb_W = selVb[3] - selVb[1];
            //四捨五入（少数第二位）
            var selVb_W = Math.round( selVb_W * 100 ) / 100;

            if ( type == "chara" ){
                l_Indent = l_Indent / selPntSze;
                R_Indent = R_Indent / selPntSze;
                F_Indent = F_Indent / selPntSze;
                //親ボックスに入る文字数
                var selVbMax = selVb_W / selPntSze;
                var oneWordWith = 1;
            }
            else {
                //親ボックスに入る文字数
                var selVbMax = selVb_W;
                var oneWordWith = selPntSze;
            }

            //字上げのMaxとMinを取得
            //最小値
            var l_IndentMin = "0";
            //最大値
            var l_IndentMax = selVbMax - R_Indent - oneWordWith;
            var l_IndentRange = l_IndentMin + "," + l_IndentMax;
            
            //字下げ
            //最小値
            var R_IndentMin = "0";
            //最大値
            var R_IndentMax = selVbMax - l_Indent - oneWordWith;
            var R_IndentRange = R_IndentMin + "," + R_IndentMax;

            //問答
            var F_IndentMin = - l_Indent;
            var F_IndentMax = l_IndentMax - l_Indent;

            var F_IndentRange = F_IndentMin + "," + F_IndentMax;

            return l_Indent + "," + R_Indent + "," + F_Indent + "," + l_IndentRange + "," + R_IndentRange + "," + F_IndentRange;
        }
    }
}

//インデント実行
function setIndent( type , value ){
    app.doScript("func(type , value)", ScriptLanguage.JAVASCRIPT , null , UndoModes.ENTIRE_SCRIPT , "my script");
    function func( type , value ){
        //スクリプトで取得する単位を設定（measurementUnit）
        switch( type ){
            case "MILLIMETERS": app.scriptPreferences.measurementUnit = MeasurementUnits.MILLIMETERS; break;
            case "POINTS": app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS; break;
            case "Q": app.scriptPreferences.measurementUnit = MeasurementUnits.Q; break;
            case "chara": app.scriptPreferences.measurementUnit = MeasurementUnits.MILLIMETERS; break;
        }
        var sel = app.activeDocument.selection[0];
        var selPntSze = sel.pointSize;

        var selCheckTxBool = false;
        switch ( sel.constructor.name ){
            case "InsertionPoint": checkTxBool = true; break;
            case "Character": checkTxBool = true; break;
            case "Word": checkTxBool = true; break;
            case "TextStyleRange": checkTxBool = true; break;
            case "Line": checkTxBool = true; break;
            case "Paragraph": checkTxBool = true; break;
            case "TextColumn": checkTxBool = true; break;
            case "Text": checkTxBool = true; break;
            case "Story": checkTxBool = true; break;
        }

        if ( checkTxBool == true ) {
            var valueSp = value.split(",");
            var l_setVal = eval( valueSp[0] );
            var R_setVal = eval( valueSp[1] );
            var F_setVal = eval( valueSp[2] );
            
            if ( type == "chara" ){
                l_setVal = l_setVal * selPntSze;
                R_setVal = R_setVal * selPntSze;
                F_setVal = F_setVal * selPntSze;
            }
            
            var l_Indent = eval(l_setVal) + eval(F_setVal);
            var R_Indent = R_setVal;
            var F_Indent = - F_setVal;

            sel.leftIndent = l_Indent;
            sel.rightIndent = R_Indent;
            sel.firstLineIndent = F_Indent;
        }
    }
}