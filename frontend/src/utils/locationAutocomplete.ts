import axios from 'axios';

export function getAutoComplete(partial: string) {

    const token = "AAPK12f0f22fbf4c4417b38d8ec96ccd5b34Sx1eaIuw5mRwzMv5Imvs-Z7LlYvbsUpgCMLzktGWeINH_ZeXo8QcMDnk-jcUO90t";
    const url = `https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${partial}&f=json&token=${token}`;

    axios.get(url)
    .then((response) => {
        let suggestions = response.data.suggestions;
    })
    .catch((error) => {
        console.error('Error fetching suggestions:', error);
    });

}