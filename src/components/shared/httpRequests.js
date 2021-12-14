import axios from 'axios';

export const fetchAllResults = (setResultsCard) => {
    axios.get('http://localhost:5000/results')
    .then(res => {
        if(res){
            const data = res.data?.reverse();
            setResultsCard(data);
        }
    })
}