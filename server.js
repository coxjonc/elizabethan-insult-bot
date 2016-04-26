var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function getInsult() {
    var words = [
        ['Artless', 'Bawdy', 'Beslubbering', 'Bootless', 'Churlish', 'Cockered', 'Clouted', 'Craven', 'Currish', 'Dankish', 'Dissembling', 'Droning', 'Errant', 'Fawning', 'Fobbing', 'Froward', 'Frothy', 'Gleeking', 'Goatish', 'Gorbellied', 'Impertinent', 'Infectious', 'Jarring', 'Loggerheaded', 'Lumpish', 'Mammering', 'Mangled', 'Mewling', 'Paunchy', 'Pribbling', 'Puking', 'Puny', 'Quailing', 'Rank', 'Reeky', 'Roguish', 'Ruttish', 'Saucy', 'Spleeny', 'Spongy', 'Surly', 'Tottering', 'Unmuzzled', 'Vain', 'Venomed', 'Villainous', 'Warped', 'Wayward', 'Weedy', 'Yeasty'],
        ['Base-court', 'Bat-fowling', 'Beef-witted', 'Beetle-headed', 'Boil-brained', 'Clapper-clawed', 'Clay-brained', 'Common-kissing', 'Crook-pated', 'Dismal-dreaming', 'Dizzy-eyed', 'Dog-hearted', 'Dread-bolted', 'Earth-vexing', 'Elf-skinned', 'Fat-kidneyed', 'Fen-sucked', 'Flap-mouthed', 'Fly-bitten', 'Folly-fallen', 'Fool-born', 'Full-gorged', 'Guts-griping', 'Half-faced', 'Hasty-witted', 'Hedge-born', 'Hell-hated', 'Idle-headed', 'Ill-breeding', 'Ill-nurtured', 'Knotty-pated', 'Milk-livered', 'Motley-minded', 'Onion-eyed', 'Plume-plucked', 'Pottle-deep', 'Pox-marked', 'Reeling-ripe', 'Rough-hewn','Rude-growing', 'Rump-fed', 'Shard-borne', 'Sheep-biting', 'Spur-galled', 'Swag-bellied', 'Tardy-gaited', 'Tickle-brained', 'Toad-spotted', 'Unchin-snouted', 'Weather-bitten'],
        ['Apple-john', 'Baggage', 'Barnacle', 'Bladder', 'Boar-pig', 'Bugbear', 'Bum-bailey', 'Canker-blossom', 'Clack-dish', 'Clot-pole', 'Coxcomb', 'Codpiece', 'Death-token', 'Dewberry', 'Flap-dragon', 'Flax-wench', 'Flirt-gill', 'Foot-licker', 'Fustilarian', 'Giglet', 'Gudgeon', 'Haggard', 'Harpy', 'Hedge-pig', 'Horn-beast', 'Huggermugger', 'Jolt-head', 'Lewdster', 'Lout', 'Maggot-pie', 'Malt-worm', 'Mammet', 'Measle', 'Minnow','Miscreant', 'Mold-warp', 'Mumble-news', 'Nut-hook', 'Pigeon-egg', 'Pignut', 'Puttock','Pumpion', 'Rats-bane', 'Scut', 'Skains-mate', 'Strumpet', 'Varlot', 'Vassal', 'Whey-face', 'Wagtail']
    ]

    var vowels = 'AEIOU';

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var insultList = [
        words[0][getRandom(0, words[0].length -1)],
        words[1][getRandom(0, words[1].length -1)],
        words[2][getRandom(0, words[2].length -1)]    
    ]

    var article = (vowels.indexOf(insultList[0][0]) > -1) ? ' an ' : ' a ';

    var insult = 'Thou art' + article + insultList[0] + ' ' + insultList[1] + ' ' + insultList[2];

    io.emit('chat message', insult);
} 

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    getInsult();
  })
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
