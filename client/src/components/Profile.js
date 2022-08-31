import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "./UserContext";
import { useState, useContext, useEffect } from "react";
import PicUser from "../Pics/blank-profile-picture.png"
import { ItemContext } from "./ItemContext";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const { favorites, handleAfterDeleteFavorite, setFavoriteStatus } = useContext(UserContext);
  const {
    veggiesInfo,
    fruitsInfo,
    fineHerbesInfo,
  } = useContext(ItemContext);
const favoritesArray = favorites.data

if (!favorites?.data?.length) {
  return null;
}



console.log("user", user.sub)
console.log("favorites", favorites.data)

const filteredFavoritesArraySocial = favoritesArray.filter((favorite) => {
  if (favorite.user?.sub == user?.sub) {
    // console.log(comment.status);
    return favorite;
  }
});


console.log("filteredFavoritesArrayS", filteredFavoritesArraySocial)

  const FavoriteIdItemVeggies = filteredFavoritesArraySocial.map((favorite)=>{
const veggieItems = veggiesInfo.find((veggie) => veggie.id == favorite.idItem);

return veggieItems
})
console.log("FavoriteIdItem",FavoriteIdItemVeggies)
return (
    <Wrapper>
      {isAuthenticated && (
        <ProfileArea>
          <h2>Profile of user </h2>
          <ProfileSection>
            {user?.picture && <ImageUser  src={user.picture} alt={user?.name} />}
            {!user.picture && <ImageUser src={PicUser} alt={user?.name} />}
            <h2      style={{
            padding: 10,
          }}>{user?.name}</h2>
{/*             <ul>
              {Object.keys(user).map((ObjKey, i) => {
                <li>
                  {ObjKey}: {user[ObjKey]}
                </li>;
              })}
            </ul> */}
          </ProfileSection>
            <h2      style={{
              padding: 10,
            }}>Favorites</h2>
          <FavoriteArea>
{/*              {filteredFavoritesArraySocial.map((favorite)=>{
               return <div>{favorite.idItem}</div>
              })
              
}  */}
  { filteredFavoritesArraySocial.map((favorite)=>{
    const veggieItems = veggiesInfo.find((veggie) => veggie.id == favorite.idItem);
    return (
      <RemoveImageArea>
      <ImageArea key={veggieItems.id} to={`/${veggieItems.id}`}>
        <Image
          style={{
            height: 200,
            }}
          cloudName="yarabrek"
          publicId={veggieItems.avatarPic}
        />
        <Label>{veggieItems.name}</Label>
   
      </ImageArea>
        <RemoveButton onClick={()=>{
        //  setFavoriteStatus(true)??
          handleAfterDeleteFavorite()
        }
      }>Remove from favorite</RemoveButton>
      </RemoveImageArea>
    );
    })
              
} 
          </FavoriteArea>
        </ProfileArea>
      )}
      {/* {!isAuthenticated && (
        <Wrapper>Please got to sign in/ sign up page</Wrapper>
      )} */}
    </Wrapper>
  );
};

// const ProfileArea = styled.div`
// margin-top: 80px;
// //height: fit-content;
// `;
const ProfileSection = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  align-content: center;
//margin-top: 80px;
//height: fit-content;
`;
const ImageUser = styled.img`
  width: auto;
  height: 80px;
  border-radius: 10px;
`;
const ProfileArea = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
 // margin-bottom: 20px;
  //margin-left: auto;
  // margin-right: auto;
`;
const Label = styled.div`
  text-align: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  font-size: 25px;
  background: rgb(72, 72, 72, 0.6);
  color: White;
`;
const RemoveButton = styled.button`
  margin-bottom: 10px;
  width: 200px;
  height: 10%;
  color: white;
  background-color:var(--secondary-color); 
  border-radius: 5px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;

`;
const ImageArea = styled(Link)`
  width: fit-content;
  position: relative;
  // border: solid black 2px;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
 // display: flex;
 // height: 860px;
  `;
const FavoriteArea = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`
const RemoveImageArea = styled.div`
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px;

`
const ProfileText = styled.p`
  font-size: 100px;
  text-align: center;
  `;

export default Profile;


// const veggieItems = veggiesInfo.filter((veggie) => veggie.id == filteredFavoritesArraySocial.idItem);
// const fruitItems = fruitsInfo.filter((fruit) => fruit.id == filteredFavoritesArraySocial.idItem);
// const fineHerbeItems = fineHerbesInfo.filter((fineHerbe) => fineHerbe.id == filteredFavoritesArraySocial.idItem);
// console.log("veggieItems", veggieItems)
