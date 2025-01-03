"""
    dot_xsum(x::StridedVector{T}, y::StridedVector{T}) where {T<:Real}

Compute the dot product of two vectors using extended precision accumulation.
Uses the `xsum` package for improved numerical accuracy.

# Note
- Very fast for large vectors, but a bit slower than Kahan summation for small vectors.
- Both input vectors must have the same length, which is not checked for performance reasons.

# References
- [neal2015fastexactsummationusing](@citet*)
- [JuliaMath/Xsum.jl](https://github.com/JuliaMath/Xsum.jl)
- [Radford Neal / xsum · GitLab](https://gitlab.com/radfordneal/xsum)
"""
function dot_xsum(x::StridedVector{Float64}, y::StridedVector{Float64})
    acc = XAccumulator(0.0)
    @inbounds for i in eachindex(x)
        accumulate!(acc, x[i] * y[i])
    end
    return float(acc)
end

"""
    dot_kahan(v1::StridedVector{T}, v2::StridedVector{T}) where {T<:Number}

Compute the dot product using Kahan summation algorithm to reduce numerical errors.

# Note
- Slower than `dot_xsum` for large vectors, but faster for small vectors.
- Similar performance to `dot_kahan_neumaier`
- Both input vectors must have the same length, which is not checked for performance reasons.
"""
function dot_kahan(v1::StridedVector{T}, v2::StridedVector{T}) where {T<:Number}
    s = zero(T)
    c = zero(T)
    y = zero(T)
    t = zero(T)
    j = 1
    n = length(v1)

    @inbounds for j in 1:n
        vj = v1[j] * v2[j]
        y = vj - c
        t = s
        s += y
        c = (s - t) - y
    end

    return s
end

"""
    dot_kahan_neumaier(v1::StridedVector{T}, v2::StridedVector{T}) where {T<:Number}

Neumaier's variant of Kahan summation algorithm to reduce numerical errors.

# Note
- Slower than `dot_xsum` for large vectors, but faster for small vectors.
- Similar performance to `dot_kahan`
- Uses loop unrolling for better performance while maintaining Kahan summation's
numerical stability. Processes two elements per iteration when possible.

# References
- [Radford Neal / xsum · GitLab](https://gitlab.com/radfordneal/xsum)
"""
function dot_kahan_neumaier(v1::StridedVector{T}, v2::StridedVector{T}) where {T<:Number}
    @inbounds begin
        n = length(v1)
        c = zero(T)
        s = v1[1] * v2[1] - c
        for i in 2:n
            si = v1[i] * v2[i]
            t = s + si
            if abs(s) >= abs(si)
                c -= ((s - t) + si)
            else
                c -= ((si - t) + s)
            end
            s = t
        end
        return s - c
    end
end

export dot_xsum, dot_kahan, dot_kahan_neumaier
