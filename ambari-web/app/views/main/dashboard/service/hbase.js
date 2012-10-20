/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var App = require('app');

App.MainDashboardServiceHbaseView = App.MainDashboardServiceView.extend({
  templateName:require('templates/main/dashboard/service/hbase'),
  serviceName:'hbase',

  Chart:App.ChartLinearView.extend({
    data:function () {
      return this.get('_parentView.data.chart');
    }.property('_parentView.data.chart')
  }),

  masterServerHeapSummary:function () {
    var percent = this.get('data.master_server_heap_total') > 0
      ? 100 * this.get('data.master_server_heap_used') / this.get('data.master_server_heap_total')
      : 0;

    return this.t('dashboard.services.hbase.masterServerHeap.summary').format(
      this.get('data.master_server_heap_used').bytesToSize(1, 'parseFloat'),
      this.get('data.master_server_heap_total').bytesToSize(1, 'parseFloat'),
      percent.toFixed(1)
    );
  }.property('data'),

  summaryHeader:function () {
    return this.t("dashboard.services.hbase.summary").format(
      this.get('data.live_regionservers'),
      this.get('data.total_regionservers'),
      this.get('data.average_load')
    );
  }.property('data'),

  regionServers:function () {
    return this.t('dashboard.services.hbase.regionServersSummary').format(
      this.get('data.live_regionservers'), this.get('data.total_regionservers')
    );

  }.property('data'),

  masterServerUptime:function () {
    var uptime = this.get('data.hbasemaster_starttime');
    var formatted = uptime.toDaysHoursMinutes();
    return this.t('dashboard.services.uptime').format(formatted.d, formatted.h, formatted.m);
  }.property("data")
});