class Github{
    constructor(){
        this.client_id='ccd3a0c757c978538dd4';
        this.client_secret='05579e08c00b61cae13f066d6b5dc818e8b71842';
    }

    async getUser(user){

        const profileResponse=await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);

        const profile=await profileResponse.json();


        return{
            profile
        }

    }
}