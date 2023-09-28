import axios from "axios";

export function isValidLocation(loc: string|undefined): boolean {
    const api_url = 'http://localhost:5000/api/fetch_coordinates';

    axios.get(api_url, {
        params: {
            location: loc
        }
    }).then(
        (res) => {
            let latlon = res.data;
            console.log(latlon);
        }
    ).catch((error) => {
        console.log(error);
    })

    return false;
}