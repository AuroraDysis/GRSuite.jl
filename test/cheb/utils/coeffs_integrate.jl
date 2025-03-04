using TestItems

@testitem "cheb_coeffs_integrate" begin
    using LinearAlgebra, Einstein.ChebyshevSuite, Test

    tol = 100 * eps()

    @testset "cheb1" begin
        n = 15
        f = cos.(cheb1_points(n))
        f_coeffs = cheb1_vals2coeffs(f)
        If_coeffs = cheb_coeffs_integrate(f_coeffs)
        If = sin.(cheb1_points(n)) .- sin(-1) # sin(x) - sin(-1) is the antiderivative of cos(x)
        If_coeffs_true = cheb1_vals2coeffs(If)
        @test norm(If_coeffs[1:(end - 1)] .- If_coeffs_true, Inf) < tol
    end

    @testset "cheb2" begin
        n = 15
        f = cos.(cheb2_points(n))
        f_coeffs = cheb2_vals2coeffs(f)
        If_coeffs = cheb_coeffs_integrate(f_coeffs)
        If = sin.(cheb2_points(n)) .- sin(-1) # sin(x) - sin(-1) is the antiderivative of cos(x)
        If_coeffs_true = cheb2_vals2coeffs(If)
        @test norm(If_coeffs[1:(end - 1)] .- If_coeffs_true, Inf) < tol
    end
end
