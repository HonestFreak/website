import CMS from 'netlify-cms-app';
async function getJSON(url) {
  const response = await fetch(url, {})
  if (!response.ok) {
    return null
  }
  return response.json()
}
window.CMS_MANUAL_INIT = true;
const today = new Date()
const shortName = today.toLocaleString('en-US', {month: 'short'});
const allMonths = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const cur_year = today.getFullYear()
var rem_months = new Set();
(async () => {
  const response = await getJSON('https://api.github.com/repos/NobleMathews/udaan_editions/git/trees/main');
  if (response == null) {
    console.log(err);
    for (let i = 2021; i < cur_year; i++) {
      allMonths.forEach(function(element) {
        rem_months.add(`${cur_year}_${element}`)
      })
    }
  } else {
    response["tree"].forEach(function(element) {
      var folder = element["path"]
      if(folder[0]=='2')
          rem_months.add(folder)
    })
  }
  var cur_month_hit = false;
  allMonths.forEach(function(element) {
      if(element == shortName)
          cur_month_hit = true;
      if(cur_month_hit)
      rem_months.add(`${cur_year}_${element}`)
  })
  var ed_collections = [];
  console.log(rem_months)
  rem_months.forEach((edition)=>{
      ed_collections.push(
          {
              name: edition,
              label: edition,
              folder: edition,
              media_folder: 'images',
              create: true,
              slug: '{{slug}}',
              fields: [
              { name: 'title', label: 'Title' },
              { name: 'category', label: 'Category' },
              { name: 'date', label: 'Date', widget: 'datetime' },
              { name: 'desc', label: 'Description', widget: 'text' },
              { name: 'thumbnail', label: 'Thumbnail', widget: 'image', required: false },
              { name: 'authors', label: 'Authors' },
              { name: 'starred', label: 'Starred', widget: 'boolean', default: false },
              { name: 'abio', label: 'Author Bio', widget: 'text' },
              { name: 'alt', label: 'Alt Text', widget: 'text', required: false },
              { name: 'body', label: 'Body', widget: 'markdown' },
              ]
          }
      )
  })

  CMS.init({
    config: {
      load_config_file: false,

      // IF TESTING
      // backend: {
      //   name: 'git-gateway',
      // },
      // local_backend: true,

      // IF PROD
      backend: {
        name: 'github',
        repo: 'NobleMathews/udaan_editions',
        branch: 'preview',
        base_url: 'https://udaanauth.onrender.com'
      },

      media_folder: 'images',
      collections: ed_collections,
    },
  });
})();