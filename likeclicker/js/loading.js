function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1000);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

onReady(function() {
  setVisible('.page', true);
  setVisible('#loading', false);
});

function loadShopItems() {
  fetch("js/data/shopitems.json")
      .then(response => response.json())
      .then(data => {
          for (var i = 0; i<data.common.length; i++){
            document.querySelector("#ShopTab").innerHTML += `
            <div id="FollowersDiv" style="width: 100%;">
					<center>
					<div class="shopitem1" id="GainFollower" class="rounded">
						<table id="ItemTable">
							<td id="ItemCell">
								<div class="shopitem1btn plus-follower-title" id="BuyButton" onClick="gainFollower()" title="+1 Follower">
									<center>
										<i class="material-icons shopitem1icon" id="like-icon" style="font-size: 50px; color: black; display: inline-flex; vertical-align: middle;">add</i><br>
										<span class="plus-follower" style="padding-left: 5px; padding-right: 5px;">+1 Follower</span>
									</center>
								</div>
							</td>
							<td style="width: 5px;"></td>
							<td id="ItemCell">
								<div id="ItemInfo">
									<span class="followers-name">Followers: </span><span id="followers">0</span><br />
									<span class="lps-follower-string">LPS: </span><span id="followerLPS">1</span><br />
									<span class="cost-follower-string">Cost: </span><span id="followerCost">10</span>
								</div>
							</td>
						</table>
					</div>
					</center>
					<br>
				</div>
        `;
          }
      });
      loadGame();
      loadLang();
      updateShop();
}