"""
    barycentric_weights(x::AbstractVector{TF}) where {TF<:AbstractFloat}
    barycentric_weights(x::AbstractRange{TF}) where {TF<:AbstractFloat}

Computes barycentric weights for the nodes `x`.

# References
- [Berrut2004](@citet*)
"""
function barycentric_weights(x::AbstractVector{TF}) where {TF<:AbstractFloat}
    return TF[inv(prod(x[i] - x[j] for j in eachindex(x) if j != i)) for i in eachindex(x)]
end

function barycentric_weights(x::AbstractRange{TF}) where {TF<:AbstractFloat}
    n = length(x) - 1
    return TF[(-1)^j * binomial(n, j) for j in 0:n]
end

function barycentric_interpolate(
    x::TF, points::AbstractVector{TF}, values::AbstractVector{TFC}, weights::Vector{TF}
) where {TF<:AbstractFloat,TFC<:Union{TF,Complex{TF}}}
    p = zero(TFC)
    q = zero(TFC)

    @inbounds for i in eachindex(points)
        Δx = x - points[i]

        if iszero(Δx)
            return values[i]
        end

        wi = weights[i] / Δx
        p += wi * values[i]
        q += wi
    end

    return p / q
end

"""
    BarycentricInterpolation{TF<:AbstractFloat}(points::AbstractVector{TF}, weights::AbstractVector{TF})

A structure representing barycentric interpolation with precomputed weights.

# Fields
- `points::AbstractVector{TF}`: Vector of interpolation points (typically Chebyshev points)
- `weights::AbstractVector{TF}`: Vector of barycentric weights

# Methods
    (itp::BarycentricInterpolation{TF})(values::AbstractVector{TFC}, x::TF) where {TF<:AbstractFloat,TFC<:Union{TF,Complex{TF}}}

Evaluate the interpolant at point `x` for function values.

# Reference
- [chebfun/@chebtech2/bary.m at master · chebfun/chebfun](https://github.com/chebfun/chebfun/blob/master/%40chebtech2/bary.m)
- [Berrut2004](@citet*)
"""
struct BarycentricInterpolation{TF<:AbstractFloat}
    points::AbstractVector{TF}   # Grid points
    weights::AbstractVector{TF}        # Barycentric weights
end

function (itp::BarycentricInterpolation{TF})(
    values::AbstractVector{TFC}, x::TF
) where {TF<:AbstractFloat,TFC<:Union{TF,Complex{TF}}}
    (; points, weights) = itp
    @argcheck points[1] <= x <= points[end] "x is out of range"

    return barycentric_interpolate(x, points, values, weights)
end

export BarycentricInterpolation, barycentric_weights, barycentric_interpolate
