// Your API key: 563492ad6f91700001000001dde3dc6fb0d3490bb2c36798bd2934fd
import { createClient } from 'pexels';
import template from '../templates/list.hbs';
const client = createClient('563492ad6f91700001000001dde3dc6fb0d3490bb2c36798bd2934fd');
const form = document.querySelector('#form');
const list = document.getElementById('list');

form.addEventListener('submit', async e => {
  e.preventDefault();
  let query = e.target.elements.search.value;
  if (!query) {
    alert('Повторите ввод');
    return;
  }
  try {
    list.innerHTML = '';
    const response = await client.videos.search({ query: query, per_page: 2 });
    console.log(response.videos);
    // const markup = template(response.videos);
    let markup = response.videos.map((video, idx) => {
      //   console.log(video);
      //   let autoplay = idx === 0 ? 'autoplay' : '';
      const videoFile = video.video_files.find(element => element.height === 720);
      console.log(videoFile.link);
      const item = `<li><video src=${videoFile.link} poster=${video.image} width='300' controls></video></li>`;
      return item;
    });
    list.insertAdjacentHTML('beforeend', markup);
    if (response.videos.length === 0) {
      throw {
        message: 'no match found',
      };
    }
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
  form.reset();
});
