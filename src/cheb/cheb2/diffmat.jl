"""
    cheb2_diffmat([TR=Float64], n::Integer, k::Integer=1) where {TR<:AbstractFloat}

Construct a Chebyshev differentiation that maps function values at `n` Chebyshev points of the 2nd kind 
to values of the `k`-th derivative of the interpolating polynomial at those points.

# Arguments
- `TR`: Element type (defaults to Float64)
- `n::Integer`: Number of Chebyshev points
- `k::Integer=1`: Order of the derivative (default: 1)

# References
- [chebfun/@chebcolloc2/chebcolloc2.m at master · chebfun/chebfun](https://github.com/chebfun/chebfun/blob/master/%40chebcolloc2/chebcolloc2.m)
"""
function cheb2_diffmat(::Type{TR}, n::Integer, k::Integer=1) where {TR<:AbstractFloat}
    x = cheb2_pts(TR, n)               # First kind points.
    w = cheb2_barywts(TR, n)           # Barycentric weights.
    t = cheb2_angles(TR, n)            # acos(x).
    D = bary_diffmat(x, w, k, t)       # Construct matrix.
    return D
end

function cheb2_diffmat(n::Integer, k::Integer=1)
    return cheb2_diffmat(Float64, n, k)
end

function cheb2_diffmat(
    ::Type{TR}, n::Integer, x_min::TR, x_max::TR, k::Integer=1
) where {TR<:AbstractFloat}
    D = cheb2_diffmat(TR, n, k)
    scale = 2 / (x_max - x_min)
    D .*= scale
    return D
end

function cheb2_diffmat(n::Integer, x_min::Float64, x_max::Float64, k::Integer=1)
    return cheb2_diffmat(Float64, n, x_min, x_max, k)
end

export cheb2_diffmat
