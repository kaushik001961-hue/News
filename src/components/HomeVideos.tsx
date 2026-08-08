export default function HomeVideos({
posts
}:{
posts:any[]
}){

return(

<section>

<h2>
Latest Videos
</h2>

<div className="grid md:grid-cols-3 gap-6">

{posts.map((post:any)=>(

<iframe

key={post.id}

src={post.video}

className="w-full h-60 rounded-xl"

allowFullScreen

/>

))}

</div>

</section>

)

}