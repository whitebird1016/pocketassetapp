import React, { useContext } from "react";
import { Formik, Form } from "formik";
import { useMutation } from 'react-query'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ProfileSchema } from './validation';
import { SnackbarContext } from "../../../state/hooks";
import { authState } from "../../../state/atoms";
import { updateOwnerProfile } from "../../../services/users"
import {
  TextField,
  Button,
  Grid,
} from "@mui/material";

import FormError from "../../organisms/FormError";

const PageWrapper = styled.div`
  min-width: 1100px;
  width: 75%;
  @media only screen and (max-width: 1099px) {
    min-width: 100%;
    width: 100%;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  flexDirection: column;
  height: 100%;
  justify-content: center;
  min-width: 1100px;
  width: 100%;

  @media only screen and (max-width: 1099px) {
    min-width: 100%;
    width: 100%;
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
const FormWrapper = styled.div`
justify-content: flex-start;
align-items: center;

@media only screen and (max-width: 1099px) {
  margin-left: 5%;
  margin-right:5%;
}
`;

type FormValues = {
  id?: string;
  name:string;
}

const Component = () => {
  const [auth,setAuth]=useRecoilState(authState)
  const setSnackbar = useContext(SnackbarContext);

  const navigate = useNavigate();
  const {
    mutate: mutateUpdateOwnerProfile,
  } = useMutation(
    ["updateOwnerProfile",updateOwnerProfile],
    (values: any) => {
      return updateOwnerProfile(auth.accessToken, auth.user_id,values.name);
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

  const handleSubmit= (values:FormValues)=> {
    mutateUpdateOwnerProfile(values);
    return;
  }
  
  return (
    <StyledContainer className="antialiased bg-mainBg flex-row">
     <PageWrapper>
        
          <ProfileHeader className="mb-10">
            <p className="font-Inter text-xs text-black">
              <span
                className=" text-black hover:cursor-pointer hover:underline"
                onClick={() => navigate("/")}>
                Owner Dashboard
              </span>
              {" > " +  "Profile "}
            </p>
            <p className="font-Inter text-4xl text-black font-bold my-2">
              Profile
            </p>
          </ProfileHeader>
          <FormWrapper>
            <Formik
              initialValues={{
               name:auth.user_name?auth.user_name:"",
              }}
              validationSchema={ProfileSchema}
              onSubmit={(values)=>handleSubmit(values)}>
             {({ values, setFieldValue, touched, errors }) => {
              return (
                <Form >
                <Grid container columnGap={3} rowGap={3} className="flex grow-0">
                          <Grid item xs={12} className="flex items-center mt-20">
                            <div className="text-base font-bold text-black">
                              Display Name
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              sx={{ width: "100%" }}
                              className="bg-[#fdfdfd] w-54 rounded-md"
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
                          <Grid item xs={12} sm={6}
                        className="flex flex-col-reverse ax:flex-row-reverse align-left ax:align-right">
                   
                          <Button
                            style={{ textTransform: "none" }}
                            type="submit"
                            className="bg-[#6F5ACD] w-full ax:w-32 h-12 text-white font-bold font-inter text-base rounded-full self-end"
                            variant="contained">
                           Update
                          </Button>

                          <Button
                            style={{ textTransform: "none" }}
                            onClick={()=>navigate("/")}
                            variant="text"
                            className="bg-mainBg w-full ax:w-28 h-12 text-black text-base font-inter font-bold rounded-full self-end mb-3 ax:mb-0"
                            >
                           Back
                          </Button>
                       
                          </Grid>
                        </Grid> 
                       
                      </Form>  
                )}}
                
             </Formik>
             </FormWrapper>
            </PageWrapper>
    </StyledContainer>
  );
};

export default Component;
