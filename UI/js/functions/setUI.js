export default function setupUI(){
    const subscribeBtn = document.querySelector("#subscribe");
    const login = document.querySelector("#login");
    login.style.display = "none";
    subscribeBtn.style.display = "none";
    const userAccount = document.querySelector("#user-account");
    userAccount.style.display = "flex";

    const userProfile = document.querySelector("#link-user");
    const profileArrow = document.querySelector("#profile-arrow");
    userProfile.addEventListener('click', e=> {
        e.preventDefault();
        const modal = document.querySelector("#user-account-modal");
        modal.style.display = "block";
        profileArrow.style.display = "block";




        window.addEventListener('click', e => {
            if(e.target == modal){
                modal.style.display = 'none';
                profileArrow.style.display = "none";
            }
        })
    })

    const userNotification = document.querySelector("#notifications");
    const notificationArrow = document.querySelector("#notification-arrow");
    userNotification.addEventListener("click", e => {
        e.preventDefault();
        const modal = document.querySelector("#notification-modal");
        modal.style.display = "block";
        notificationArrow.style.display = "block";

        window.addEventListener('click', e => {
            if(e.target == modal){
                modal.style.display = "none";
                notificationArrow.style.display = "none";
            }
        })
    })
}