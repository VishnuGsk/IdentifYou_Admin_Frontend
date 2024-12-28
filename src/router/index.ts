
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
    path: '/programDetail/:id/:programId',
    name: 'program-details',
    component: ProgramDetails,
    props: true,
  },
]


export default routes