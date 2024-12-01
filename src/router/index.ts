/*
 * Trinom Digital Pvt Ltd ("COMPANY") CONFIDENTIAL                             *
 * Copyright (c) 2024 Trinom Digital Pvt Ltd, All rights reserved              *
 *                                                                             *
 * NOTICE:  All information contained herein is, and remains the property      *
 * of COMPANY. The intellectual and technical concepts contained herein are    *
 * proprietary to COMPANY and may be covered by Indian and Foreign Patents,    *
 * patents in process, and are protected by trade secret or copyright law.     *
 * Dissemination of this information or reproduction of this material is       *
 * strictly forbidden unless prior written permission is obtained from         *
 * COMPANY. Access to the source code contained herein is hereby forbidden     *
 * to anyone except current COMPANY employees, managers or contractors who     *
 * have executed Confidentiality and Non-disclosure agreements explicitly      *
 * covering such access.                                                       *
 *                                                                             *
 * The copyright notice above does not evidence any actual or intended         *
 * publication or disclosure of this source code, which includes               *
 * information that is confidential and/or proprietary, and is a trade secret, *
 * of COMPANY. ANY REPRODUCTION, MODIFICATION, DISTRIBUTION, PUBLIC            *
 * PERFORMANCE, OR PUBLIC DISPLAY OF OR THROUGH USE OF THIS SOURCE CODE        *
 * WITHOUT THE EXPRESS WRITTEN CONSENT OF COMPANY IS STRICTLY PROHIBITED,      *
 * AND IN VIOLATION OF APPLICABLE LAWS AND INTERNATIONAL TREATIES. THE         *
 * RECEIPT OR POSSESSION OF THIS SOURCE CODE AND/OR RELATED INFORMATION DOES   *
 * NOT CONVEY OR IMPLY ANY RIGHTS TO REPRODUCE, DISCLOSE OR DISTRIBUTE ITS     *
 * CONTENTS, OR TO MANUFACTURE, USE, OR SELL ANYTHING THAT IT MAY DESCRIBE,    *
 * IN WHOLE OR IN PART.                                                        *
 *                                                                             *
 * File: /src/router/index.ts                                                  *
 * Project: identifyou-admin                                                   *
 * Created Date: Sunday, November 17th 2024, 1:22:48 pm                        *
 * Author: Vishnu <vishnu@codestax.ai>                                         *
 * -----                                                                       *
 * Last Modified:                                                              *
 * Modified By:                                                                *
 * -----                                                                       *
 * Any app that can be written in JavaScript,                                  *
 *     will eventually be written in JavaScript !!                             *
 * -----                                                                       *
 * HISTORY:                                                                    *
 * Date         By  Comments                                                   *
 * --------------------------------------------------------------------------- *
 */

import { createRouter, createWebHistory } from 'vue-router'
import MentorList from '../views/mentors/MentorList.vue'
import MentorDetails from '../views/mentors/MentorDetails.vue'
import MenteeList from '../views/mentees/MenteeList.vue'
import MenteeDetails from '../views/mentees/MenteeDetails.vue'
import ProgramList from '../views/programs/ProgramList.vue'
import ProgramDetails from '../views/programs/ProgramDetails.vue'

const routes = [
  {
    path: '/',
    redirect: '/mentors',
  },
  {
    path: '/mentors',
    name: 'mentors',
    component: MentorList,
  },
  {
    path: '/mentors/:id',
    name: 'mentor-details',
    component: MentorDetails,
    props: (route) => ({ id: Number(route.params.id) }), // Ensure type safety
  },
  {
    path: '/mentees',
    name: 'mentees',
    component: MenteeList,
  },
  {
    path: '/mentees/:id',
    name: 'mentee-details',
    component: MenteeDetails,
    props: true,
  },
  {
    path: '/programs',
    name: 'programs',
    component: ProgramList,
  },
  {
    path: '/programs/:id',
    name: 'program-details',
    component: ProgramDetails,
    props: true,
  },
]


export default routes