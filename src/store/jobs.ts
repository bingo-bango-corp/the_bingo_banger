const jobs = {
  firestorePath: 'jobs',
  firestoreRefType: 'collection',
  moduleName: 'jobs',
  statePropName: 'data',
  namespaced: true,
  getters: {
    allJobs: (state: any) => {
      return Object.values(state.data);
    },
    jobs: (state: any) => {
      return Object.values(state.data).filter((j: any) => {
        return j.state === 'unassigned';
      });
    },
    assignedJobs: (state: any) => {
      return Object.values(state.data).filter((j: any) => {
        return j.state === 'assigned';
      });
    },
    deliveredJobs: (state: any) => {
      return Object.values(state.data).filter((j: any) => {
        return j.state === 'delivered';
      });
    },
  },
  sync: {
    where: [['terminal', '==', false]],
  },
};

export default jobs;
