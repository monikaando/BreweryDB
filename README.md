To run the application: npm start after installing node modules (npm i)

- <b>Application</b><br>
    1) Application uses BreweryDB's API.
    2) I made the application according to instructions from PXL widgets.<br>
    3) The whole application is responsive.<br>
    4) I took care to keep the code is clean and readable.<br>
    5) For images I used Claudinary.<br>
    6) For styling I used Sass(I could use Bootstrap or Bulma (like in my previous projects), but I wanted to show that I know how CSS, Sass and responsivity works.)<br>
    7) I added a favicon and the title for the website.<br>
    
- <b>Navigation bar</b><br>
     Two buttons and a home page<br>
   
- <b>Breweries button</b><br>
    1) On the beginning page is loading all breweries in the BreweryDB database<br>
    2) You can choose - from a dropdown list - a country you would like to show breweries for. Database provides only 3 countries (US, IE, BE)<br>
    3) When you are opening a website the app is loading country code list for drop down list using /locations/<br>
    4) Then app is calling all breweries from a database and show them on the page (as a default start screen) using /locations/?countryIsoCode=${this.state.select.selectedCode}&order=breweryName - where countryIsoCode has empty value for All countries. The same endpoints are used for looking for breweries from country, but then app provides cuntryIscCode value.<br>

    * <u>Breweries details</u><br>
        When you click on a brewery name you are going to the brewery detail page where you can see information about a brewery and list of their beers<br>

        * <u>Beers details</u><br>
        When you click on a beer name you are going to the beer detail page where you can see information about this beer<br>
 
    
- <b>Beers button</b><br>
    1) Here you can search beers by name, type or country<br>
    2) Beside this I created 2 buttons which allow to reset searching data and jump to the next page <br><br>

    * <u>Searching by name</u><br>
    1) I used endpoints: search/?key=XXX&p=${this.state.page}&type=beer&q=${this.state.name} It was useful with searching, but Brewery didn't provide detailed searching. Whetever i put on the end it was looking for if the whole beer object contain it. To search by name I checked if name of the beer includes value of the input field.<br>

    * <u>Searching by type</u><br>
    1) I used the same endpoints like for searching by name. I repeated the same procedure again, this time checking if beer.styles exist (becasue not always it is provided)<br>

    * <u>Searching by country</u><br>
    1) When the page is load on the beginning the app is calling country code list to show it in a drop down list. Searching resetting this list, so if we won't refresh a page it is not visible. I set up the app that it calls code list again after you click on drop down list (it can take a while to download codes)<br>
    2) I discovered that searching doesn't work with locations, so I used: /beers/?withBreweries=Y&key=XXX=${this.state.page}
    I must choose between two options: download every beer at once and make app waiting till all beers are downloaded, or show beers we are looking for, on these pages where they are physically exist and then search beers page by page. I chose option with button, what couses that some pages are half empty or have only few beers on a page, but on the next page we still have another beers, also for Belgium beers are visible only on pages: 7,9 and 15.<br>
    3) You can click a name of a beer and go to detail page with beer (from there you can go to its brewery as well) <br>
        
- <b>Footer</b><br>
    An additional element with the link to my github page.<br><br>
    
    
<b>Desktop version:</b>

<div style="display: flex; justify-content: center">
<img src="" />
</div><br><br>


<b>Mobile version:</b>
<div style="display: flex; justify-content: center">
<img src="" />
</div>
