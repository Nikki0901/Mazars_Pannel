import React, { useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { positions, Provider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'bulma/css/bulma.css'
import PageNotFound from './components/PageNotFound/PageNotFound'



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
import Layout from './components/Layout/Layout'
import SelectCategoryPage from './views/SelectCategoryPage/SelectCategoryPage'
import QueriesTab from './views/QueriesTab/QueriesTab'
import ProposalTab from './views/ProposalTab/ProposalTab'
import AssignmentTab from './views/AssignmentTab/AssignmentTab'
import ProposalReceived from './views/ProposalView/ProposalView'
import ForgetPassword from './views/ForgetPassword/ForgetPassword'
import NewPassword from './views/NewPassword/NewPassword'
import ChangePassword from './views/ChangePassword/ChangePassword'
import EditQuery from './views/EditQuery/EditQuery'
import VideoCall from './views/VideoCall/VideoCall'
import MeetingComponent from './views/MeetingComponent/MeetingComponent'
import schedule from './views/Schedule/schedule'
import ViewNotification from './views/ViewNotification/ViewNotification'
import Chatting from './views/Chatting/Chatting'
import Message from './views/Message/Message'
import ProposalView from './views/ProposalView/ProposalView'
import Feedback from './views/Feedback/Feedback'
import FeedbackData from './views/FeedbackData/FeedbackData'
import PaymentStatus from './views/PaymentStatus/PaymentStatus'



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
import AdminAssignmentTab from './pages/Admin/AssignmentTab/index'
import AdminPaymentStatusTab from './pages/Admin/PaymentStatusTab/PaymentStatusTab'
import AdminTeamLeaderTab from './pages/Admin/TeamLeaderTab/TeamLeaderTab'
import AdminTaxProfessionalsTab from './pages/Admin/TaxProfessionalsTab/TaxProfessionalsTab'
import AdminFeedbackTab from './pages/Admin/FeedbackTab/FeedbackTab'
import AdminPendingRecevived from './pages/Admin/PendingReceived/PendingRecevived'
import AdminForgetPassword from './pages/Admin/ForgetPassword/ForgetPassword'
import AdminNewPassword from './pages/Admin/NewPassword/NewPassword'
import AdminQueryRejection from './pages/Admin/QueryRejection/QueryRejection'
import AdminSchedule from './pages/Admin/Schedule/Schedule'
import AdminMeetingComponent from './pages/Admin/MeetingComponent/MeetingComponent'
import AdminChatting from './pages/Admin/Chatting/Chatting'
import AdminMessage from './pages/Admin/Message/Message'
import AdminViewNotification from './pages/Admin/ViewNotification/ViewNotification'




//TL routes
import TlStart from './pages/TL/Start/Start'
import TlLogin from './pages/TL/Login/Login'
import TlDashboard from './pages/TL/Dashboard/Dashboard'
import TlAddAssingmentStages from './pages/TL/AddAssingmentStages/AddAssingmentStages'
import TlAddNew from './pages/TL/AddNew/AddNew'
import TlAddTeamProf from './pages/TL/AddTeamProf/AddTeamProf'
import TlProposalTab from './pages/TL/Proposal/ProposalTab'
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
import TlAssignmentForm from './pages/TL/AssignmentForm/AssignmentForm'
import TlViewReport from './pages/TL/ViewReport/ViewReport'
import TlForgetPassword from './pages/TL/ForgetPassword/ForgetPassword'
import TlNewPassword from './pages/TL/NewPassword/NewPassword'
import TlViewNotification from './pages/TL/ViewNotification/ViewNotification'
import TlChatting from './pages/TL/Chatting/Chatting'
import TlMessage from './pages/TL/Message/Message'
import TlSchedule from './pages/TL/Schedule/Schedule'
import TlMeetingComponent from './pages/TL/MeetingComponent/MeetingComponent'




// TP routes
import TpStart from './pages/TP/Start/Start'
import TpLogin from './pages/TP/Login/Login'
import TpQueriesRecevied from './pages/TP/QueriesRecevied/QueriesRecevied'
import TpQueriesTab from './pages/TP/QueriesTab/QueriesTab'
import TpProposal from './pages/TP/Proposal/Proposal'
import TpSendProposal from './pages/TP/SendProposal/SendProposal'
import TpEditProposal from './pages/TP/EditProposal/EditProposal'
import TpChangePassword from './pages/TP/ChangePassword/ChangePassword'
import TpDashboard from './pages/TP/Dashboard/Dashboard'
import TpForgetPassword from './pages/TP/ForgetPassword/ForgetPassword'
import TpNewPassword from './pages/TP/NewPassword/NewPassword'




//private routes
import PrivateRouteUser from './Service/PrivateRouteUser'
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
            <Route exact path="/customer/new-password/:id" component={NewPassword} />
            <Route exact path="/customer/change-password" component={ChangePassword} />
            <Route exact path="/customer/edit-query/:id" component={EditQuery} />
            <Route exact path="/customer/video-call" component={VideoCall} />
            <Route exact path="/customer/meeting" component={MeetingComponent} />
            <Route exact path="/customer/schedule" component={schedule} />
            <Route exact path="/customer/view-notification/:id" component={ViewNotification} />
            <Route exact path="/customer/proposal_view/:id" component={ProposalView} />
            <Route exact path="/customer/message" component={Message} />
            <Route exact path="/customer/chatting/:id" component={Chatting} />
            <Route exact path="/customer/feedback/:id" component={Feedback} />
            <Route exact path="/customer/feedback-data" component={FeedbackData} />
            <Route exact path="/customer/paymentstatus" component={PaymentStatus} />




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
            <Route exact path="/admin/forget-password" component={AdminForgetPassword} />
            <Route exact path="/admin/new-password" component={AdminNewPassword} />
            <Route exact path="/admin/query_rejection/:id" component={AdminQueryRejection} />
            <Route exact path="/admin/schedule" component={AdminSchedule} />
            <Route exact path="/admin/meeting" component={AdminMeetingComponent} />
            <Route exact path="/admin/chatting/:id" component={AdminChatting} />
            <Route exact path="/admin/message" component={AdminMessage} />
            <Route exact path="/admin/view-notification/:id" component={AdminViewNotification} />



            <Route exact path="/teamleader/start" component={TlStart} />
            <Route exact path="/teamleader/login" component={TlLogin} />
            <Route exact path="/teamleader/dashboard" component={TlDashboard} />
            <Route exact path="/teamleader/addnew" component={TlAddNew} />
            <Route exact path="/teamleader/addteamprof" component={TlAddTeamProf} />
            <Route exact path="/teamleader/proposal" component={TlProposalTab} />
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
            <Route exact path="/teamleader/assignment-form/:id" component={TlAssignmentForm} />
            <Route exact path="/teamleader/meeting" component={TlMeetingComponent} />
            <Route exact path="/teamleader/view-report/:id" component={TlViewReport} />
            <Route exact path="/teamleader/schedule" component={TlSchedule} />
            <Route exact path="/teamleader/forget-password" component={TlForgetPassword} />
            <Route exact path="/teamleader/new-password/:id" component={TlNewPassword} />
            <Route exact path="/teamleader/view-notification/:id" component={TlViewNotification} />
            <Route exact path="/teamleader/chatting/:id" component={TlChatting} />
            <Route exact path="/teamleader/message" component={TlMessage} />




            <Route exact path="/taxprofessional/start" component={TpStart} />
            <Route exact path="/taxprofessional/login" component={TpLogin} />
            <Route exact path="/taxprofessional/queries/:id" component={TpQueriesRecevied} />
            <Route exact path="/taxprofessional/queriestab" component={TpQueriesTab} />
            <Route exact path="/taxprofessional/proposal" component={TpProposal} />
            <Route exact path="/taxprofessional/sendproposal/:id" component={TpSendProposal} />
            <Route exact path="/taxprofessional/edit-proposal/:id" component={TpEditProposal} />
            <Route exact path="/taxprofessional/change-password" component={TpChangePassword} />
            <Route exact path="/taxprofessional/dashboard" component={TpDashboard} />
            <Route exact path="/taxprofessional/forget-password" component={TpForgetPassword} />
            <Route exact path="/taxprofessional/new-password/:id" component={TpNewPassword} />

            <Route exact path="/*" component={PageNotFound} />

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
{/*  */ }

  // <Switch>
      //   <Route exact path="/" component={Login} />
      //   <PrivateRoute
      //     path="/admin"
      //     render={(props) => <AdminLayout {...props} />}
      //   />


      // </Switch>