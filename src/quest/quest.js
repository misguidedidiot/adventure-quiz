import api from '../services/api.js';
import createChoice from './create-choice.js';
import loadProfile from '../load-profile.js';
import scoreQuest from '../quest/score-quest.js';

loadProfile();

const choicesParentNode = document.getElementById('choices');
const questTitle = document.getElementById('title');
const questImage = document.getElementById('image');
const questDescription = document.getElementById('description');
const choiceForm = document.getElementById('choice-form');

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

const questData = api.getQuest(id);
const user = api.getUser();

questTitle.textContent = questData.title;
questImage.src = './assets/' + questData.image;
questDescription.textContent = questData.description;

for(let i = 0; i < questData.choices.length; i++) {
    const choice = questData.choices[i];
    const choiceRadio = createChoice(choice);
    choicesParentNode.appendChild(choiceRadio);
}

choiceForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(choiceForm);
    const choiceId = formData.get('choice-radio');

    for(let index = 0; index < questData.choices.length; index++) {
        const choice = questData.choices[index];
        if(choice.id === choiceId) {
            api.saveUser(scoreQuest(user, choice));
            loadProfile();
        }
    }
});


