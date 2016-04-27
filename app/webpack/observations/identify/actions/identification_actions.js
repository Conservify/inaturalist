import inatjs from "inaturalistjs";
import {
  loadingDiscussionItem,
  fetchCurrentObservation
} from "./current_observation_actions";
import { fetchObservationsStats } from "./observations_stats_actions";

const POST_IDENTIFICATION = "post_identification";

function postIdentification( params ) {
  return function ( dispatch ) {
    const body = Object.assign( {}, params );
    body.user_id = 1;
    return inatjs.identifications.create( body )
      .then( response => {
        dispatch( fetchObservationsStats( ) );
        return response;
      } );
  };
}

function agreeWithObservaiton( observation ) {
  return function ( dispatch ) {
    dispatch( loadingDiscussionItem( ) );
    return dispatch(
      postIdentification( { observation_id: observation.id, taxon_id: observation.taxon.id } )
    ).then( ( ) => {
      dispatch( fetchCurrentObservation( observation ) );
    } );
  };
}

function agreeWithCurrentObservation( ) {
  return function ( dispatch, getState ) {
    return agreeWithObservaiton( getState( ).currentObservation.observation );
  };
}

export {
  postIdentification,
  POST_IDENTIFICATION,
  agreeWithObservaiton,
  agreeWithCurrentObservation
};
