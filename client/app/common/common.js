import angular from "angular";
import adminTopBar from "./admin/adminTopBar/adminTopBar";
import helperTopBar from "./helper/helperTopBar/helperTopBar";

import boxStatistic from "./boxStatistic/boxStatistic";
import boxTotalStatistic from "./boxTotalStatistic/boxTotalStatistic";

import appendClinicModal from "./admin/appendClinicModal/appendClinicModal";
import deleteClinicModal from "./admin/deleteClinicModal/deleteClinicModal";
import editClinicModal from "./admin/editClinicModal/editClinicModal";
import appendHelperModal from "./admin/appendHelperModal/appendHelperModal";
import deleteHelperModal from "./admin/deleteHelperModal/deleteHelperModal";
import editHelperModal from "./admin/editHelperModal/editHelperModal";

import personalCard from "./helper/personalCard/personalCard";
import loadingSpinner from "./loadingSpinner/loadingSpinner";

import medbookMap from "./medbookMap/medbookMap";

import personQualification from "./helper/personQualification/personQualification";
import personEducation from "./helper/personEducation/personEducation";
import appendRequest from "./helper/appendRequest/appendRequest";
import declineRequest from "./helper/declineRequest/declineRequest";
import approvedRequest from "./helper/approvedRequest/approvedRequest";


import deleteDoctorModal from "./helper/deleteDoctorModal/deleteDoctorModal";

import "@lordfriend/nya-bootstrap-select/dist/css/nya-bs-select.min.css";
import "@lordfriend/nya-bootstrap-select/dist/js/nya-bs-select";

let commonModule = angular.module("app.common", [
	adminTopBar,
	helperTopBar,

	boxStatistic,
	boxTotalStatistic,

	appendClinicModal,
	deleteClinicModal,
	editClinicModal,
	appendHelperModal,
	deleteHelperModal,
	editHelperModal,
	helperTopBar,
  	medbookMap,


	personalCard,
	loadingSpinner,

	personQualification,
	personEducation,
	appendRequest,
	declineRequest,
	approvedRequest,


	deleteDoctorModal,

	"nya.bootstrap.select"
])

	.name;

export default commonModule;
