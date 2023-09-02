const handleAllCard = async (categoriesName) => {
    // get data with api 

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/${categoriesName}`);
    const data = await res.json();
    const allCategories = data.data

    // create category button with category name 

    const categoryList = document.getElementById('category-list')
    allCategories.forEach(category => {
        const div = document.createElement('div')
        div.innerHTML = `
            <button id="category-btn" onclick="handleVideoCard(${category.category_id})" class="myButton bg-gray-300 hover:bg-[#FF1F3D] hover:text-white px-5 mb-3 py-1 rounded text-base text-gray-600 font-medium">${category.category}<span class="text-[0px] hidden">${category.category_id}</span></button>
        `
        categoryList.appendChild(div)
    });
    
    // sort by views 

    const handleButton = document.querySelectorAll('.myButton')
    handleButton.forEach(button => {
        button.addEventListener('click', function(event){
           sortById = event.target.childNodes[1].innerText
        })
    })
    handleVideoCard(1000)
}


// create video card with details

const handleVideoCard = async (categoryId, sorted) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await res.json()
    const allVideoCard = data.data

    // card sorted by views 

    if(sorted){
        allVideoCard.sort((a, b) => b.others?.views?.slice(0, -1) - a.others?.views?.slice(0, -1));
    }

    // clear recent data from all card section 
    const noVideo = document.getElementById('no-video')
    noVideo.innerHTML = ''

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = ''
    
    // making video card section
    if(allVideoCard.length > 0){

        allVideoCard.forEach(card => {
    
            // posted hours and minute setup
            const second = card.others.posted_date
            const hours = second % 3600
            const hour = (second - hours) / 3600
            const minute = Math.floor(hours / 60)
    
            // create card one by one 
            const div = document.createElement('div')
            div.innerHTML = `
            <div class="relative">
                <img class="w-full h-[220px] rounded-lg" src="${card.thumbnail}" alt="">
                ${card.others?.posted_date ? `<span class="absolute bottom-[15px] right-[10px] bg-black rounded text-white text-[10px] font-regular p-1">${hour} hrs ${minute} min ago</span>` : ''}
            </div>
            <div class="flex gap-3 mt-5">
                <div>
                    <img src="${card.authors[0]?.profile_picture}" alt="" class="rounded-full w-[40px] h-[40px]">
                </div>
                <div class="space-y-1">
                    <h3 class="font-bold text-base text-[#171717]">${card.title}</h3>
                    <h4><span class="text-sm font-regular text-gray-600 mr-2">${card.authors[0]?.profile_name}</span> ${card.authors[0].verified ? '<span><i class="fa-solid fa-circle-check text-blue-500"></i></span>' : ''}</h4>
                    <h4 class="text-sm font-regular text-gray-600">${card.others?.views} views</h4>
                </div>
            </div>
            `
            cardContainer.appendChild(div)
        });
    }
    else{
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="grid place-items-center	space-y-4 pb-60">
            <img src="images/Icon.png" alt="">
            <h1 class="text-3xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h1>
        </div>
        `
        noVideo.appendChild(div)
    }
}

// sorted video by views function
let sortById = 1000;
const test = () => {
    handleVideoCard(sortById, true)
}

handleAllCard("categories")