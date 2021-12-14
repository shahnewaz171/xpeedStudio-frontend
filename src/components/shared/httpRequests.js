import axios from 'axios';

export const fetchAllResults = (setResultsCard) => {
    axios.get('https://sheltered-forest-00893.herokuapp.com/results')
    .then(res => {
        if(res){
            const data = res.data?.reverse();
            setResultsCard(data);
        }
    })
}