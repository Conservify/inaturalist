import _ from "lodash";
import React, { PropTypes } from "react";
import { Panel } from "react-bootstrap";
import moment from "moment-timezone";
import SplitTaxon from "../../../shared/components/split_taxon";
import UserImage from "../../identify/components/user_image";
import ActivityItemMenu from "./activity_item_menu";


const ActivityItem = ( { observation, item, config, deleteComment, deleteID,
                         restoreID, setFlaggingModalState } ) => {
  if ( !item ) { return ( <div /> ); }
  let taxonImageTag;
  const taxon = item.taxon;
  const isID = !!taxon;
  let contents;
  let header;
  let className;
  let buttons;
  const userLink = (
    <a href={ `/people/${item.user.login}` }>{ item.user.login }</a>
  );
  // TODO: mentions
  if ( isID ) {
    if ( taxon && item.taxon.defaultPhoto ) {
      taxonImageTag = (
        <img src={ taxon.defaultPhoto.photoUrl( ) } className="taxon-image" />
      );
    } else if ( taxon.iconic_taxon_name ) {
      taxonImageTag = (
        <i
          className={`taxon-image icon icon-iconic-${
            taxon.iconic_taxon_name.toLowerCase( )}`}
        >
        </i>
      );
    } else {
      taxonImageTag = <i className="taxon-image icon icon-iconic-unknown"></i>;
    }
    header = "suggested an ID";
    if ( !item.current ) { className = "withdrawn"; }
    contents = (
      <div className="identification">
        <div className="taxon">
          { taxonImageTag }
          <SplitTaxon
            taxon={ taxon }
            url={ `/taxa/${taxon.id}` }
          />
        </div>
        { item.body ? (
          <div
            className="id_body"
            dangerouslySetInnerHTML={ { __html: item.body } }
          />
        ) : null }
      </div>
    );
    buttons = ( <div className="buttons">
      <div className="btn-space">
        <a href={ `/observations/identotron?observation_id=${observation.id}&taxon_id=${observation.taxon.id}` }>
          <button className="btn btn-default">
            <i className="fa fa-exchange" /> Compare
          </button>
        </a>
      </div>
    </div> );
  } else {
    header = "commented";
    contents = (
      <div dangerouslySetInnerHTML={ { __html: item.body } } />
    );
  }
  const relativeTime = moment.parseZone( item.created_at ).fromNow( );
  let panelClass;
  let status;
  if ( item.flags && item.flags.length > 0 ) {
    panelClass = "flagged";
    status = ( <span className="item-status">
      <i className="fa fa-flag" /> Flagged
    </span> );
  } else if ( item.category ) {
    if ( item.category === "maverick" ) {
      panelClass = "maverick";
      status = ( <span className="item-status">
        <i className="fa fa-bolt" /> Maverick
      </span> );
    } else if ( item.category === "improving" ) {
      panelClass = "improving";
      status = ( <span className="item-status">
        <i className="fa fa-trophy" /> Improving
      </span> );
    }
  }
  return (
    <div className={ className }>
      <div className="icon">
        <UserImage user={ item.user } />
      </div>
      <Panel className={ panelClass } header={(
        <span>
          <span className="title_text">
            { userLink }&nbsp;
            { header }
          </span>
          <ActivityItemMenu
            item={ item }
            config={ config }
            deleteComment={ deleteComment }
            deleteID={ deleteID }
            restoreID={ restoreID }
            setFlaggingModalState={ setFlaggingModalState }
          />
          <span className="time">
            { relativeTime }
          </span>
          { status }
        </span>
        )}
      >
        { contents }
        { buttons }
      </Panel>
    </div>
  );
};

ActivityItem.propTypes = {
  item: PropTypes.object,
  config: PropTypes.object,
  currentUserID: PropTypes.object,
  observation: PropTypes.object,
  deleteComment: PropTypes.func,
  deleteID: PropTypes.func,
  restoreID: PropTypes.func,
  setFlaggingModalState: PropTypes.func
};

export default ActivityItem;
