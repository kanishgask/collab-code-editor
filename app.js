if(join){
 return <EditorRoom roomId={room} username={name}/>;
}

return(
<div className='home'>
<div className='card'>
<h1>Collaborative Editor</h1>
<input
placeholder='Name'
value={name}
onChange={e=>setName(e.target.value)}
/>
<input
placeholder='Room'
value={room}
onChange={e=>setRoom(e.target.value)}
/>
<button onClick={()=>setJoin(true)}>
Join Room
</button>
</div>
</div>
)
}
