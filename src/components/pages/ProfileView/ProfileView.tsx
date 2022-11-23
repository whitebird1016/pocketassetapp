import React, { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import ProfileViewTemplate from "../../templates/ProfileViewTemplate/ProfileViewTemplate";
import { useMutation } from "react-query";
import { SnackbarContext } from "../../../state/hooks";
import { countryList } from "../../../assets/countries";
import { useRecoilState } from "recoil";
import { authState } from "../../../state/atoms";
import { getUserById } from "../../../services/users.js";
import { Formik, Form } from "formik";
import FormError from "../../organisms/FormError/FormError";
import { Grid, Button, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProfileSchema } from "./validation";
/*Dashboard Main */
import { updateProfile } from "../../../services/users.js";
const StyledContainer = styled.span`
  padding-top: 3%;
  // margin-bottom: 50%;
  // margin-top: -3%;
  display: flex;
  // flex: 100vw;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap: nowrap;
  // background-color: green;
  flex-direction: row-reverse;
  @media only screen and (max-width: 1030px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ProfileHeader = styled.div`
  justify-content: flex-start;
  align-items: center;

  @media only screen and (max-width: 1099px) {
    margin-left: 5%;
    margin-right:5%;
  }
`;

const StyledTitleContainer = styled.span`
  padding-top: -6%;
  // margin-bottom: 50%;
  display: flex;
  // flex: 100vw;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: nowrap;
  // background-color: green;
`;

const StyledInnerContainer = styled.span`
  display: flex;
  // align-content: center;
  flex-direction: column;
  // justifycontent: center;
  flex-wrap: nowrap;
`;

const StyledInnerHeader = styled.span`
  // display: flex;
  margin-top: -0.5%;
  // flex-direction: column;
  // justifycontent: center;
  flex-wrap: wrap;
  position: absolute;
  margin-left: 480px;
  // background-color: green;
`;

const StyledExpandContainer = styled.span`
  // display: flex;
  // margin-top: -0.2%;
  // flex-direction: column;
  // justifycontent: center;
  flex-wrap: wrap;
  position: absolute;
  margin-left: 650px;
  // background-color: green;
  cursor: pointer;
`;

const StyledWhiteButtonProfileView = styled.p`
  background-color: #f6f6f6;
  /* background-color: green; */
  border-radius: 50px;
  cursor: pointer;
  width: fit-content;
  height: 40px;
  border: none;
  margin-top: -5%;
  color: black;
  padding-bottom: 10px; 
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
`;

const StyledPurpleButtonProfileView = styled.p`
  background-color: #6f5acd;
  border-radius: 50px;
  cursor: pointer;
  width: fit-content;
  height: 40px;
  border: none;
  color: white;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: -5%;
  float: right;
  margin-right: 30;
`;
type UserData = {
  user_name:string,
  user_id:string,
  country?:string,
  payout_address?:string
}

const Component = () => {
  const [show, setShow] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const [user, setUser] = useState<UserData>();
  const setSnackbar = useContext(SnackbarContext);
  const navigate=useNavigate();
  useEffect(()=>{
    async function getUser(){
      if(auth)
      {
        const result = await getUserById(auth.accessToken, auth.user_id)
        
        setUser(result.user);
      }
    }
    getUser();
  },[auth])
  const {
    mutate: mutateUpdateProfile,
  } = useMutation(
    ["updateProfile",updateProfile],
    (values: any) => {
      return updateProfile(auth.accessToken, auth.user_id, values);
    },
    {
      onSuccess: (resp) => {
        setSnackbar({
          title: "Success",
          content: "Successfully updated the profile.",
          type: "success",
        });
      },
      onError: (e) => {
        setSnackbar({
          title: "Error",
          content: "Failed to update profile. Please try again.",
          type: "error",
        });
      },
    },
  );
  const handleSubmit = (values)=>{
    mutateUpdateProfile(values)
  }
  const handleSubmitPassword = (values)=>{

  }
  return (
    <section className="bg-[#F6F6F6]">
      <StyledContainer>
        <ProfileViewTemplate />
        <div className="max-w-[528] h-fit pt-[20] rounded-[10] w-full">
          <StyledTitleContainer>
          <ProfileHeader className="mb-10">
            <p className="font-Inter text-xs text-black">
              <span
                className=" text-black hover:cursor-pointer"
                onClick={() => navigate("/")}>
                Dashboard
              </span>
              {" > " +  "Profile "}
            </p>
            <p className="font-Inter text-4xl text-black font-bold my-2">
              Profile
            </p>
          </ProfileHeader>
          </StyledTitleContainer>
          <StyledInnerContainer>
          { user&&(<Formik
              initialValues={{
               name:user?user.user_name:"",
               country:user?.country?user.country:"",
               payout:user?.payout_address?user.payout_address:"",
              }}
              validationSchema={ProfileSchema}
              onSubmit={(values)=>handleSubmit(values)}>
              {({values, setFieldValue, touched, errors})=>{
                return(
                  <Form>
                <Grid container columnGap={3} rowGap={3} className="flex grow-0">
                          <Grid item xs={12} className="flex items-center mt-20">
                            <div className="text-base font-bold text-black">
                              Display Name
                            </div>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              sx={{ width: "100%", height:"45px" }}
                              className="bg-[#D9D9D9] w-54 rounded-md"
                              variant="filled"
                              size="small"
                              value={values.name}
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  borderRadius: "0.375rem",
                                },
                              }}
                              inputProps={{
                                style: {
                                  padding: "10px 12px",
                                  textIndent:"15px",
                                },
                              }}
                              onChange={(event) =>
                                setFieldValue("name", event.target.value)
                              }
                             
                            />
                            <FormError
                              top="-10px"
                              isAbsolute
                              sx={{ position: "relative" }}>
                              <>{touched.name && errors.name}</>
                            </FormError>
                          </Grid>
                          <Grid item xs={12} className="flex items-center mt-3">
                            <div className="text-base font-bold text-black">
                             Country
                            </div>
                          </Grid>
                          <Grid item xs={4}>
                          <Select 
                          className="bg-darkerBg border-0 rounded w-full px-3 text-gray-700 leading-tight"
                          sx={{
                            height:"45px"
                          }}
                            id="countries"
                            value={values.country}
                            
                            onChange={(event)=>{
                              setFieldValue("country", event.target.value)
                            }}>
                              {countryList.map((country)=>{
                                return(
                                  <MenuItem value={country.code}>{country.name}</MenuItem>
                                )
                              })}
                            </Select>
                            </Grid>
                            <Grid item xs={12} className="flex items-center mt-3">
                            <div className="text-base font-bold text-black">
                              Payout Address
                            </div>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              sx={{ width: "100%", height:"45px" }}
                              className="bg-[#D9D9D9] w-54 rounded-md"
                              variant="filled"
                              size="small"
                              value={values.payout}
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  borderRadius: "0.375rem",
                                },
                              }}
                              inputProps={{
                                style: {
                                  padding: "10px 12px",
                                  textIndent: "15px",
                                },
                              }}
                              onChange={(event) =>
                                setFieldValue("payout", event.target.value)
                              }
                             
                            />
                            <FormError
                              top="-10px"
                              isAbsolute
                              sx={{ position: "relative" }}>
                              <>{touched.payout && errors.payout}</>
                            </FormError>
                          </Grid>
                          <Grid item xs={8}
                        className="flex flex-col-reverse ax:flex-row-reverse align-left ax:align-right">
                   
                          <Button
                            style={{ textTransform: "none" }}
                            type="submit"
                            className="bg-[#6F5ACD] w-full ax:w-32 h-12 text-white font-bold font-inter text-base rounded-full self-end"
                            variant="contained">
                           Update
                          </Button>
                       
                          </Grid>
                        </Grid> 
                       
                      </Form> 
                )
              }}  
              </Formik>)}
              { user&&(<Formik
              initialValues={{
                old_password:"",
                password:""
              }}
              onSubmit={(values)=>handleSubmitPassword(values)}>
              {({values, setFieldValue, touched, errors})=>{
                return(
                  <Form>
                <Grid container columnGap={3} rowGap={3} className="flex grow-0">
                <Grid item xs={12} className="flex items-center mt-20">
                            <div className="text-base font-bold text-black">
                              Current Password
                            </div>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              sx={{ width: "100%", height:"45px" }}
                              className="bg-[#D9D9D9] w-54 rounded-md"
                              variant="filled"
                              size="small"
                              value={values.old_password}
                              type="password"
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  borderRadius: "0.375rem",
                                },
                              }}
                              inputProps={{
                                style: {
                                  padding: "10px 12px",
                                  textIndent:"15px",
                                },
                              }}
                              
                              onChange={(event) =>
                                setFieldValue("old_password", event.target.value)
                              }
                             
                            />
                            <FormError
                              top="-10px"
                              isAbsolute
                              sx={{ position: "relative" }}>
                              <>{touched.password && errors.password}</>
                            </FormError>
                          </Grid>
                          <Grid item xs={12} className="flex items-center mt-3">
                            <div className="text-base font-bold text-black">
                              New Password
                            </div>
                          </Grid>
                          <Grid item xs={8}>
                            <TextField
                              sx={{ width: "100%", height:"45px" }}
                              className="bg-[#D9D9D9] w-54 rounded-md"
                              variant="filled"
                              size="small"
                              value={values.password}
                              type="password"
                              InputProps={{
                                disableUnderline: true,
                                style: {
                                  borderRadius: "0.375rem",
                                },
                              }}
                              inputProps={{
                                style: {
                                  padding: "10px 12px",
                                  textIndent:"15px",
                                },
                              }}
                              
                              onChange={(event) =>
                                setFieldValue("password", event.target.value)
                              }
                             
                            />
                            <FormError
                              top="-10px"
                              isAbsolute
                              sx={{ position: "relative" }}>
                              <>{touched.password && errors.password}</>
                            </FormError>
                          </Grid>
                          <Grid item xs={8}
                        className="flex flex-col-reverse ax:flex-row-reverse align-left ax:align-right">
                   
                          <Button
                            style={{ textTransform: "none" }}
                            type="submit"
                            className="bg-[#6F5ACD] w-full ax:w-32 h-12 text-white font-bold font-inter text-base rounded-full self-end"
                            variant="contained">
                           Update
                          </Button>
                       
                          </Grid>
                        </Grid> 
                       
                      </Form> 
                )
              }}  
              </Formik>)}
          </StyledInnerContainer>
        </div>
      </StyledContainer>
    </section>
  );
};

export default Component;



