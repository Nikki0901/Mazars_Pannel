import React from 'react';
import Layout from "../../../components/Layout/Layout";

function PaymentStatusTab() {
    const userid = window.localStorage.getItem("adminkey");
    return (
        <Layout adminDashboard="adminDashboard"  adminUserId={userid}>
            PaymentStatusTab
        </Layout>
    );
}

export default PaymentStatusTab;