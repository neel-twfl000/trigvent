import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import themes from './Mui/themes';
import NavigationScroll from './Mui/layout/NavigationScroll';
import Routing from './Routing';
import Loader from './Mui/ui-component/Loader'

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [user, setUser] = useState({
    data: {
      isLoading: true,
      isAuthenticated: false,
      userData: {}
    }
  })
 
  const [loader, setLoader] = useState(true)

  function setupState() {
    let { data } = user
    let userData = JSON.parse(localStorage.getItem('user_data'))
    if (userData) {
      data.isAuthenticated = true
      data.userData = userData
    }
    data.isLoading = false
    setUser({ data })
  }

  useEffect(() => {
    setupState()
    // setTimeout(()=>{
    //   setLoader(false)
    // }, 2000)

    setLoader(false)
    
  }, [])

  return (!user.data.isLoading &&
    <ThemeProvider theme={themes(customization)}>
      <NavigationScroll>
        <Loader isActive={loader}/>
        <Routing user={user} loader={loader} setLoader={setLoader}/>
      </NavigationScroll>
    </ThemeProvider>
  );
};

export default App;
