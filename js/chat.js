$(function() {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 1.为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function() {
        // （1）.点击发送后清楚文本框内容
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('');
        }

        // （2）.如果用户输入了聊天内容 则将聊天内容追加到页面上显示
        $('#talk_list').append(' <li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>');
        // （3）. 再清楚文本框
        $('#ipt').val('');
        // （4）.重置滚动条的位置
        resetui()

        // （5）.调用信息函数
        getMsg(text);
    })

    // 2.获取聊天机器人发送回来的信息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function(res) {
                // console.log(res)
                if (res.message == 'success') {
                    var msg = res.data.info.text;
                    $('#talk_list').append(' <li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>');
                    resetui()
                    getVoice(msg)

                }
            }
        })
    }
    // 3. 把文本转换为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function(res) {
                // console.log(res);
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl);
                }
            }
        })
    }

    // 4.敲下回车进行发送信息
    $('#ipt').on('keyup', function(e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            $('#btnSend').click();
        }
    })
})