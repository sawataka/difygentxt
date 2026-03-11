const form = document.getElementById("form")

const messages = [
 "AIが質問を分析しています...",
 "情報を整理しています...",
 "回答を生成しています..."
]

let i = 0

function startLoadingAnimation(){

 const text = document.getElementById("loading-text")

 setInterval(()=>{

  text.innerText = messages[i]

  i = (i+1)%messages.length

 },2000)

}

form.addEventListener("submit", async function(e){

 e.preventDefault()

 document.getElementById("loading").style.display="block"

 document.getElementById("result").style.display="none"

 startLoadingAnimation()

 const formData = new FormData(form)

 const res = await fetch("/generate",{

  method:"POST",
  body:formData

 })

 const data = await res.json()

 document.getElementById("loading").style.display="none"

 showResult(data)

})

function showResult(data){

 document.getElementById("result").style.display="block"

 const temp = document.createElement("div")
 temp.innerHTML = data.description

 const text = temp.innerText

 typeWriter("description", text)


//  typeWriter(
//   "description",
//   data.description
//  )

 const pointsDiv = document.getElementById("points")

 pointsDiv.innerHTML=""

 data.points.forEach(p=>{

  const card = document.createElement("div")

  card.className =
  "bg-gray-800 p-6 rounded shadow"

  card.innerText = p

  pointsDiv.appendChild(card)

 })

 document.getElementById("sns").innerText = data.sns_post


 // 👇ここでびよーんスクロール
document.getElementById("result").scrollIntoView({
  behavior: "smooth"
})


}

function typeWriter(id,html){

 const el = document.getElementById(id)

 el.innerHTML=""

 let i=0

 const speed=10

 const txt = html

 function typing(){

  if(i<txt.length){

   el.innerHTML += txt.charAt(i)

   i++

   setTimeout(typing,speed)

  }

 }

 typing()

}

function copyPost(){

 const text = document.getElementById("sns").innerText

 navigator.clipboard.writeText(text)

 alert("コピーしました")

}