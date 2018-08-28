const fs=require('fs');
const path=require('path');
const http=require('http');
const socketIo=require('socket.io');
const server=http.createServer((request,respons)=>{
	respons.writeHead(200,{
		'Content-Type':'text/html;charset=uft-8'
	});
	respons.end(fs.readFileSync(path.join(__dirname,'index.html')))
}).listen(8000);
let io=socketIo.listen(server);
let users=[];
io.on('connection',socket=>{
	console.log(1,socket)
	socket.on('loginserver',msg=>{
		console.log(msg)
		if(users.indexOf(msg)==-1){
			users.push(msg);
			socket.emit('loginclient',msg)
		}else{
			socket.emit('dontlogin',msg)
		}
	});

	socket.on('loginok',msg=>{
		console.log(msg)
		let str='';
		if(!str){
			io.emit('welcome','欢迎<b style="font-size:16px;color:skyblue">'+msg+'</b>进入群聊')
			str=msg
		}
		
	});
	socket.on('chat',msg=>{
		console.log(msg)
		io.emit('chatclient',msg)
	})
	socket.on('remove',function(){
		io.emit('clear')
	})

})