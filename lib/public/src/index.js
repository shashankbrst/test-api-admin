/**
 * Created by udit on 10/24/17.
 */

import 'bootstrap/dist/js/bootstrap.min'
import 'admin-lte/dist/js/app.min'
import 'datatables.net/js/jquery.dataTables'
import 'datatables.net-bs/js/dataTables.bootstrap'
import 'select2'
import $ from 'jquery'

import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'
import 'datatables.net-bs/css/dataTables.bootstrap.css'
import 'select2/dist/css/select2.min.css'
import 'select2-bootstrap-theme/dist/select2-bootstrap.min.css'

// Style css
import './style.scss'

import collectionBuilder from './collection-builder'

// Select2 init
$(document).ready(() => {
  $('.js-select2').select2({
    theme: 'bootstrap',
  })
})

// DataTable
$(document).ready(() => {
  try {
    if (collections != undefined && collectionName != undefined) {
      $(document).on('click', '.js-om-api-delete-obj', e => {
        e.preventDefault()
        const confirmed = confirm('Are you sure you want to delete?')
        if (confirmed) {
          const collectionName = $(e.currentTarget).data('collection-name')
          const objId = $(e.currentTarget).data('obj-id')
          $.ajax({
            url: `/collection/${collectionName}/${objId}/`,
            type: 'DELETE',
            success(data, textStatus, xhr) {
              if (data == 'OK') {
                // force the page to reload from server.
                window.location.reload(true)
              } else {
                console.log(textStatus)
                console.log(data)
                alert('Something went wrong. Check Console Logs.')
              }
            },
            error(xhr, textStatus, error) {
              console.log(textStatus)
              console.log(error)
              alert('Something went wrong. Check Console Logs.')
            },
          })
        }
      })

      const collectionColumns = collectionBuilder.getCollectionColumns(collectionName, collections)
      $('#collection-table').DataTable({
        processing: true,
        serverSide: true,
        stateSave: true,
        ajax: {
          url: '/collection/' + collectionName + '/queryDataTable/',
          type: 'GET',
        },
        dom:
          '<"box"<"box-header"<"box-toolbar"<"clearfix"ri><"pull-left"<lf>><"pull-right"p>>><"box-body table-responsive"t>>',
        columns: collectionColumns,
      })
    }
  } catch (err) {
    console.log('dataTable block skipped')
  }
})

// Single View Page. Remove query string once page is loaded.
$(document).ready(() => {
  try {
    // Only do this on single view page & only when object is updated.
    if (isSingleView != undefined && isSingleView) {
      if (location.search.length > 0) {
        if (window.history && window.history.pushState) {
          history.pushState(null, '', location.href.split('?')[0])
        }
      }
    }
  } catch (err) {
    console.log('query string skipped')
  }
})
