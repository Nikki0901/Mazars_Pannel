import React, { useEffect } from "react";
import {HashRouter  as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'bulma/css/bulma.css'


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
import Feedback from './views/Feedback/Feedback'
import Layout from './components/Layout/Layout'
import SelectCategoryPage from './views/SelectCategoryPage/SelectCategoryPage'
import QueriesTab from './views/QueriesTab/QueriesTab'
import ProposalTab from './views/ProposalTab/ProposalTab'
import AssignmentTab from './views/AssignmentTab/AssignmentTab'
import ProposalReceived from './views/ProposalReceived/ProposalReceived'
import ForgetPassword from './views/ForgetPassword/ForgetPassword'
import NewPassword from './views/NewPassword/NewPassword'
import ChangePassword from './views/ChangePassword/ChangePassword'
import EditQuery from './views/EditQuery/EditQuery'
import VideoCall from './views/VideoCall/VideoCall'
import MeetingComponent from './views/MeetingComponent/MeetingComponent'




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
import AdminPendingRecevived from './pages/Admin/PendingReceived/PendingRecevived'





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
import TlEditTP from './pages/TL/EditTP/EditTP'
import TlFeedbackTab from './pages/TL/FeedbackTab/FeedbackTab'
import TlPaymentStatus from './pages/TL/PaymentStatus/PaymentStatus'
import TlAssignmentTab from './pages/TL/AssignmentTab/AssignmentTab'
import TlSendProposal from './pages/TL/SendProposal/SendProposal'
import TlQueriesTab from './pages/TL/QueriesTab/QueriesTab'
import TlEditProposal from './pages/TL/EditProposal/EditProposal'
import TlPendingReceived from './pages/TL//PendingReceived/PendingReceived'
import TlQueryTab2 from './pages/TL/QueryTab2/QueryTab2'
import TlAssignmentForm from './pages/TL/AssignmentForm/AssignmentForm'
import TlMeetingComponent from './pages/TL/MeetingComponent/MeetingComponent'






// TP routes
import TpStart from './pages/TP/Start/Start'
import TpLogin from './pages/TP/Login/Login'
import TpDashboard from './pages/TP/Dashboard/Dashboard'
import TpProposal from './pages/TP/Proposal/Proposal'
import TpQueriesRecevied from './pages/TP/QueriesRecevied/QueriesRecevied'
import TpSendProposal from './pages/TP/SendProposal/SendProposal'





//private routes
// import PrivateRouteUser from './Service/PrivateRouteUser'
import PrivateRouteAdmin from './Service/PrivateRouteAdmin'
import PrivateRouteTL from './Service/PrivateRouteTL'
import PrivateRouteTP from './Service/PrivateRouteTP'




const options = {
  timeout: 4000,
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
        <Route exact path="/customer/feedback" component={Feedback} />
        <Route exact path="/customer/dashboard" component={Dashboard} />
        <Route exact path="/customer/my-assingment/:id" component={MyAssingment} />
        <Route exact path="/customer/addfresh" component={AddFreshAssingment} />
        <Route exact path="/customer/select-category" component={SelectCategoryPage} />
        <Route exact path="/customer/dashboard" component={Layout} />
        <Route exact path="/customer/queries" component={QueriesTab} />
        <Route exact path="/customer/proposal" component={ProposalTab} />
        <Route exact path="/customer/assignment" component={AssignmentTab} />
        <Route exact path="/customer/proposal-received/:id" component={ProposalReceived} />
        <Route exact path="/customer/forget-password" component={ForgetPassword} />
        <Route exact path="/customer/new-password" component={NewPassword} />
        <Route exact path="/customer/change-password" component={ChangePassword} />
        <Route exact path="/customer/edit-query/:id" component={EditQuery} />
        <Route exact path="/customer/video-call" component={VideoCall} />
        <Route exact path="/customer/meeting" component={MeetingComponent} />




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
        <Route exact path="/admin/pending/:id" component={AdminPendingRecevived} />



        <Route exact path="/teamleader/start" component={TlStart} />
        <Route exact path="/teamleader/login" component={TlLogin} />
        <Route exact path="/teamleader/dashboard" component={TlDashboard} />
        <Route exact path="/teamleader/addnew" component={TlAddNew} />
        <Route exact path="/teamleader/addteamprof" component={TlAddTeamProf} />
        <Route exact path="/teamleader/proposal" component={TlProposal} />
        <Route exact path="/teamleader/addassingment/:id" component={TlAddAssingmentStages} />
        <Route exact path="/teamleader/queries/:id" component={TlQueriesRecevied} />
        <Route exact path="/teamleader/queryassing/:id" component={TlQueryAssingment} />
        <Route exact path="/teamleader/edittp/:id" component={TlEditTP} />
        <Route exact path="/teamleader/feedback" component={TlFeedbackTab} />
        <Route exact path="/teamleader/paymentstatus" component={TlPaymentStatus} />
        <Route exact path="/teamleader/assignment" component={TlAssignmentTab} />
        <Route exact path="/teamleader/sendproposal/:id" component={TlSendProposal} />
        <Route exact path="/teamleader/queriestab" component={TlQueriesTab} />
        <Route exact path="/teamleader/edit-proposal/:id" component={TlEditProposal} />
        <Route exact path="/teamleader/pending/:id" component={TlPendingReceived} />
        <Route exact path="/teamleader/queriestab2" component={TlQueryTab2} />
        <Route exact path="/teamleader/assignment-form/:id" component={TlAssignmentForm} />
        <Route exact path="/teamleader/meeting" component={TlMeetingComponent} />



        <Route exact path="/taxprofessional/start" component={TpStart} />
        <Route exact path="/taxprofessional/login" component={TpLogin} />
        <Route exact path="/taxprofessional/dashboard" component={TpDashboard} />
        <Route exact path="/taxprofessional/proposal" component={TpProposal} />
        <Route exact path="/taxprofessional/queries/:id" component={TpQueriesRecevied} />
        <Route exact path="/taxprofessional/sendproposal/:id" component={TpSendProposal} />




      

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