function getdate() {
var date =new Date();
date.toLocaleString('en-US', { timeZone: 'America/New_York' });
var dateStr =
("00" + (date.getMonth()+1)).slice(-2)
+ "/" + ("00" + date.getDate()).slice(-2)
+ "/" + date.getFullYear() + " "
+ ("00" + date.getHours()).slice(-2) + ":"
+ ("00" + date.getMinutes()).slice(-2)
+ ":" + ("00" + date.getSeconds()).slice(-2);
return dateStr.trim();
}
