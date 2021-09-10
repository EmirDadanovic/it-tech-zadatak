//definisanje varijable parent html elemenata za pristup child elementima zadali smo vise divizija za sto specificnije selektovanje
let sliderWrap=document.querySelector('.slider-wrap');
let slider= document.querySelector('.slider');// korsitice se kao uslov za if petlje 

//globalne varijable
let clonesWidth;//sirina clonova slika iz niza
let sliderWidth; //sirina slider containera 
let clones=[];// array koji cemo generisati kako bi se slike ponavljale beskonacno 
let disableScroll = false; //kako bi scroll postoajao na stranici koja nema dovoljno sadrzaja
let scrollPos;
let items =[...document.querySelectorAll('.slider-item')];// tackice korsitimo za varijable sa vise argumenata 
let images =[...document.querySelectorAll('.img-div')];// u ove dvije varijable smo sacuvali parent diviziju i slike potrebno kako bi mogli indexirati slike i zadati ih

//koristimo prethodno definsianu varijablu images  inkrementiramo index za svaku sliku  i preko gore zadane varijable stavljamo je kao background 
images.forEach ((image, idx )=>{
image.style.backgroundImage=`url(./images/${idx + 1}.jpg)`
})

// clonovi ne psotoji u dokumentu dok nije dodan u node zato za svaku varijablu u item nizu  stvaramo clone i dodajemo u  node preko append child-a i pushamo ga kao clone objekat.
items.forEach(item=>{
    let clone = item.cloneNode(true);
    clone.classList.add('clone');
    slider.appendChild(clone);
    clones.push(clone);
})

//funkcija koja koja kao svoju vrijednost vraca sirinu slike "klonova offsetwidth tu vrijednost pretvara u integer broj i preko += ga zadajamo width-u" 
function getClonesWidth(){
  let width = 0;
  clones.forEach (clone=>{
      width += clone.offsetWidth;
    })
  return width;
}

//funkcija za trenutno poziciju scrollbara po y osi
function getScrollPos(){
  return window.scrollY;
}

//if petlja sa ugnijezdenom els if petljom gdje ukoliko bi vrijednost sirine clona zajedno sa pozicijom 
//scrolbara bila veca od slider container vrijednosti  scrollbar se vraca na vrh a za slucaj da je dosao do kraja 
//vratit ce se na vrh i novi klon ce popuniti poziciju prethodnog u slider containeru. Prije ispunjena tih 
//uslova dajemo obavjstavamo browser da zelimo izvrsiti animaciju u ovom slucaju translate koji mice element kako smo zadali preko window methode na mjesto po y osi 
function scrollUpdate(){
  scrollPos=getScrollPos();
  if(clonesWidth + scrollPos >= sliderWidth){
    window.scrollTo({top: 1});
  
  }else if (scrollPos <= 0){
    window.scrollTo( {top: sliderWidth - clonesWidth - 1})
  }
  slider.style.transform=`translateX(${-window.scrollY}px)`
  requestAnimationFrame(scrollUpdate)
  }
  
  //preko getBoundingClientRect metode u callculatedimensions dobijamo informacije o velicini slider zadajemo sirinu clona i imitiramo sirinu slider elementa i bodya
  // posto nam je sirina ovih elemenata najbitnija i trebamo je  u int var u memorijii sikoristili u gornjim funckcijama  ove funckije i njihove varijable se prve uctitavaju u skripti
  function onLoad(){
    calculateDimensions();
    document.body.style.height=`${sliderWidth}px`
    window.scrollTo({top: 1});
    scrollUpdate();
  }
  function calculateDimensions(){
    
   sliderWidth=slider.getBoundingClientRect().width;
    clonesWidth = getClonesWidth();

  }
  onLoad();