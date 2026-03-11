const form = document.getElementById("form")

form.addEventListener("submit", async function(e){

 e.preventDefault()

 const loading = document.getElementById("loading")
 const result = document.getElementById("result")

 loading.style.display = "block"
 result.style.display = "none"

 const formData = new FormData(form)

 const res = await fetch("/generate",{
  method:"POST",
  body:formData
 })

 const data = await res.json()

 loading.style.display = "none"

 if(data.error){
  alert(data.error)
  return
 }

 document.getElementById("description").innerHTML =
  data.description

 const pointsDiv = document.getElementById("points")
 pointsDiv.innerHTML = ""

 data.points.forEach(p => {

  const card = document.createElement("div")

  card.className =
   "bg-blue-50 p-4 rounded shadow"

  card.innerText = p

  pointsDiv.appendChild(card)

 })

 document.getElementById("sns").innerText =
  data.sns_post

 result.style.display = "block"

})


function copyPost(){

 const text = document.getElementById("sns").innerText

 navigator.clipboard.writeText(text)

 alert("コピーしました")

}