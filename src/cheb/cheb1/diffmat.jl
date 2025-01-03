"""
    cheb1_diffmat([TR=Float64], n::Integer, k::Integer=1) where {TR<:AbstractFloat}

Construct a Chebyshev differentiation that maps function values at `n` Chebyshev points of the 1st kind 
to values of the `k`-th derivative of the interpolating polynomial at those points.

# Arguments
- `TR`: Element type (defaults to Float64)
- `n::Integer`: Number of Chebyshev points
- `k::Integer=1`: Order of the derivative (default: 1)

# References
- [chebfun/@chebcolloc1/chebcolloc1.m at master · chebfun/chebfun](https://github.com/chebfun/chebfun/blob/master/%40chebcolloc1/chebcolloc1.m)
"""
function cheb1_diffmat(::Type{TR}, n::Integer, k::Integer=1) where {TR<:AbstractFloat}
    x = cheb1_pts(TR, n)               # First kind points.
    w = cheb1_barywts(TR, n)           # Barycentric weights.
    t = cheb1_angles(TR, n)            # acos(x).
    D = bary_diffmat(x, w, k, t)       # Construct matrix.
    return D
end

function cheb1_diffmat(n::Integer, k::Integer=1)
    return cheb1_diffmat(Float64, n, k)
end

function cheb1_diffmat(
    ::Type{TR}, n::Integer, x_min::TR, x_max::TR, k::Integer=1
) where {TR<:AbstractFloat}
    D = cheb1_diffmat(TR, n, k)
    scale = 2 / (x_max - x_min)
    D .*= scale
    return D
end

function cheb1_diffmat(n::Integer, x_min::Float64, x_max::Float64, k::Integer=1)
    return cheb1_diffmat(Float64, n, x_min, x_max, k)
end

export cheb1_diffmat
