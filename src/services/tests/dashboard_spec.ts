import { DashboardQueries } from "../dashboard";

const dashboard = new DashboardQueries();

describe("Dashboard methods", () => {
  
  it('should have an top five products method', () => {
    expect(dashboard.topFivePopularProducts).toBeDefined();
  });

});