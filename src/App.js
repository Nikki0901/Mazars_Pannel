import React, { useEffect } from "react";
import {HashRouter  as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";



//user routes
import Signin from './views/SignInForm/SignIn'
import SignUp from './views/SignUpForm/SignUp'
import VerifyOtp from './views/VerifyOtp/VerifyOtp'
import VerifyOtpLogin from './views/VrerifyOtpLogin/VerifyOtpLogin'
import RegisterYourSelf from './views/RegisterYourSelf/RegisterYourSelf'
import Start from './views/Start/Start'
import Dashboard from './views/Dashboard/Dashboard'
import MyAssingment from './views/MyAssingment/MyAssingment'
import AddFreshAssingment from './views/AddFressAssignment/AddFreshAssingment'
import QuestionnairePage from './views/QuestionnairePage/QuestionnairePage'
import Questionnaire from './views/Quesionnaire/Questionnaire'
import Feedback from './views/Feedback/Feedback'
import Layout from './components/Layout/Layout'
import SelectCategoryPage from './views/SelectCategoryPage/SelectCategoryPage'
import QueriesTab from './views/QueriesTab/QueriesTab'
import ProposalTab from './views/ProposalTab/ProposalTab'
import AssignmentTab from './views/AssignmentTab/AssignmentTab'



//admin routes
import AdminStart from './pages/Admin/Start/Start'
import AdminLogin from './pages/Admin/Login/Login'
import AdminDashboard from './pages/Admin/Dashboard/Dashboard'
import AdminNewTeamLeader from './pages/Admin/AddNewTeamLeader/AddNewTeamLeader'
import AdminNewTaxProf from './pages/Admin/AddNewTaxProf/AddNewTaxProf'
import AdminProposal from './pages/Admin/Proposal/Proposal'
import AdminQueriesRecevied from './pages/Admin/QueriesRecevied/QueriesRecevied'
import AdminQueryAssingment from './pages/Admin/QueryAssingment/QueryAssingment'
import AdminEditTL from './pages/Admin/EditTL/EditTL'
import AdminEditTP from './pages/Admin/EditTP/EditTP'
import AdminQueriesTab from './pages/Admin/QueriesTab/QueriesTab'
import AdminAssignmentTab from './pages/Admin/AssignmentTab/AssignmentTab'
import AdminPaymentStatusTab from './pages/Admin/PaymentStatusTab/PaymentStatusTab'
import AdminTeamLeaderTab from './pages/Admin/TeamLeaderTab/TeamLeaderTab'
import AdminTaxProfessionalsTab from './pages/Admin/TaxProfessionalsTab/TaxProfessionalsTab'
import AdminFeedbackTab from './pages/Admin/FeedbackTab/FeedbackTab'




//TL routes
import TlStart from './pages/TL/Start/Start'
import TlLogin from './pages/TL/Login/Login'
import TlDashboard from './pages/TL/Dashboard/Dashboard'
import TlAddAssingmentStages from './pages/TL/AddAssingmentStages/AddAssingmentStages'
import TlAddNew from './pages/TL/AddNew/AddNew'
import TlAddTeamProf from './pages/TL/AddTeamProf/AddTeamProf'
import TlProposal from './pages/TL/Proposal/Proposal'
import TlQueriesRecevied from './pages/TL/QueriesRecevied/QueriesRecevied'
import TlQueryAssingment from './pages/TL/QueryAssingment/QueryAssingment'



// TP routes
import TpStart from './pages/TP/Start/Start'
import TpLogin from './pages/TP/Login/Login'
import TpDashboard from './pages/TP/Dashboard/Dashboard'
import TpProposal from './pages/TP/Proposal/Proposal'
import TpQueriesRecevied from './pages/TP/QueriesRecevied/QueriesRecevied'


//private routes
// import PrivateRouteUser from './Service/PrivateRouteUser'
import PrivateRouteAdmin from './Service/PrivateRouteAdmin'
import PrivateRouteTL from './Service/PrivateRouteTL'
import PrivateRouteTP from './Service/PrivateRouteTP'




const options = {
  timeout: 2000,
  position: positions.TOP_CENTER,
  offset: "80px",
  transition: transitions.SCALE,
};


function App() {
  return (
    <div>
        <Provider template={AlertTemplate} {...options}>
        <Router>
        <Switch>

        <Route exact path="/" component={Start} />
        <Route exact path="/customer/signin" component={Signin} />
        <Route exact path="/customer/signup" component={SignUp} />
        <Route exact path="/customer/register-yourself" component={RegisterYourSelf} />
        <Route exact path="/customer/verify-otp" component={VerifyOtp} />
        <Route exact path="/customer/otp" component={VerifyOtpLogin} />
        <Route exact path="/customer/questionnaire-page" component={QuestionnairePage} />
        <Route exact path="/customer/questionnaire" component={Questionnaire} />
        <Route exact path="/customer/feedback" component={Feedback} />
        <Route exact path="/customer/dashboard" component={Dashboard} />
        <Route exact path="/customer/my-assingment/:id" component={MyAssingment} />
        <Route exact path="/customer/addfresh" component={AddFreshAssingment} />
        <Route exact path="/customer/select-category" component={SelectCategoryPage} />
        <Route exact path="/customer/dashboard" component={Layout} />
        <Route exact path="/customer/queries" component={QueriesTab} />
        <Route exact path="/customer/proposal" component={ProposalTab} />
        <Route exact path="/customer/assignment" component={AssignmentTab} />





        <Route exact path="/admin/start" component={AdminStart} />
        <Route exact path="/admin/login" component={AdminLogin} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/addnewtl" component={AdminNewTeamLeader} />
        <Route exact path="/admin/addnewtp" component={AdminNewTaxProf} />
        <Route exact path="/admin/teamleaders" component={AdminTeamLeaderTab} />
        <Route exact path="/admin/taxprofessionals" component={AdminTaxProfessionalsTab} />
        <Route exact path="/admin/proposal" component={AdminProposal} />
        <Route exact path="/admin/queries/:id" component={AdminQueriesRecevied} />
        <Route exact path="/admin/queryassing/:id" component={AdminQueryAssingment} />
        <Route exact path="/admin/queriestab" component={AdminQueriesTab} />
        <Route exact path="/admin/feedback" component={AdminFeedbackTab} />
        <Route exact path="/admin/paymentstatus" component={AdminPaymentStatusTab} />
        <Route exact path="/admin/assignment" component={AdminAssignmentTab} />
        <Route exact path="/admin/edittl/:id" component={AdminEditTL} />
        <Route exact path="/admin/edittp/:id" component={AdminEditTP} />




        <Route exact path="/teamleader/start" component={TlStart} />
        <Route exact path="/teamleader/login" component={TlLogin} />
        <Route exact path="/teamleader/dashboard" component={TlDashboard} />
        <Route exact path="/teamleader/addnew" component={TlAddNew} />
        <Route exact path="/teamleader/addteamprof" component={TlAddTeamProf} />
        <Route exact path="/teamleader/proposal" component={TlProposal} />
        <Route exact path="/teamleader/addassingment/:id" component={TlAddAssingmentStages} />
        <Route exact path="/teamleader/queries/:id" component={TlQueriesRecevied} />
        <Route exact path="/teamleader/queryassing/:id" component={TlQueryAssingment} />
        



        <Route exact path="/taxprofessional/start" component={TpStart} />
        <Route exact path="/taxprofessional/login" component={TpLogin} />
        <Route exact path="/taxprofessional/dashboard" component={TpDashboard} />
        <Route exact path="/taxprofessional/proposal" component={TpProposal} />
        <Route exact path="/taxprofessional/queries/:id" component={TpQueriesRecevied} />
      
    
        </Switch>
      </Router>
      </Provider>
    </div>
  );
}


export default App;










          {/* <Route exact path="/" component={Start} />
          <Route exact path="/abc" component={Layout} />

          <Route exact path="/signin" component={Signin} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/register-yourself" component={RegisterYourSelf} />
          <Route exact path="/verify-otp" component={VerifyOtp} />
          <Route exact path="/otp" component={VerifyOtpLogin} />
          <Route exact path="/questionnaire-page" component={QuestionnairePage} />
             
          <Route exact path="/questionnaire" component={Questionnaire} />    
          <Route exact path="/feedback" component={Feedback} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/my-assingment/:id" component={MyAssingment} />
          <Route exact path="/addfresh" component={AddFreshAssingment} /> */}
          {/*  */}

  // <Switch>
      //   <Route exact path="/" component={Login} />
      //   <PrivateRoute
      //     path="/admin"
      //     render={(props) => <AdminLayout {...props} />}
      //   />

        
      // </Switch>