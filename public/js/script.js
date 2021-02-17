const url = require("../../models/url")

$(document).ready(function () {

    //用alert方法把沒輸入內容的操作擋下來
    $('#shorten').on("click", () => {
        console.log($('#url').val())
        if ($('#url').val() === "" || $('#url').val() === 'undefined' || $('#url').val() === '請輸入網址！！！') {
            alert('請輸入網址！！！')
        }
    })

    //按鈕後將文字複製到剪貼簿
    $("#copy").on("click", () => {
        $('#rulInput').select()
        document.execCommand("Copy")
        console.log($('#rulInput').val())
        alert("已經複製短網址到剪貼簿囉～")
    })


})

